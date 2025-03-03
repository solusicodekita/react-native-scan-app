import type {BQ} from './types';
// import type {RootState} from '@store/store';
import type {BaseQueryApi} from '@reduxjs/toolkit/query';
import {pasien_id_encrypted, token} from '@store/session/selectors';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {apiSipsAuth} from '../auth/endpoints';
import {getGenericPassword} from 'react-native-keychain';
import {
  ApiSipsCachedResponse,
  SipsJsonResponse,
  SipsPacsResponse,
} from '../types';
import {loadCache} from '@store/cache/thunks';
import {blobCacheSlice} from '@store/cache/cache';

/**
 * Memicu fungsi login/logut berdasarkan ada tidaknya
 * username dan password di local storage.
 */
const relogin = async (api: BaseQueryApi) => {
  const credentials = await getGenericPassword();
  if (credentials) {
    await api.dispatch(
      apiSipsAuth.endpoints.login.initiate({
        no_rekam_medik: credentials.username,
        password: credentials.password,
      }),
    );
  } else {
    await api.dispatch(apiSipsAuth.endpoints.logout.initiate());
  }
};

/**
 * Fungsi utama untuk komunikasi dengan backend SIPS.
 * Menggunakan library react-native-blob-util untuk fetch dan write
 * ke local storage.
 */
export const cachedQuery = function (
  {baseUrl}: {baseUrl: string | undefined} = {baseUrl: ''},
): BQ {
  return async function ({config = {}, method, body, ...blobArgs}, api) {
    // mendapatkan pasien_id_encrypted dari store
    // untuk dikirim dalam setiap request
    const pxid = pasien_id_encrypted(api.getState());
    if (!pxid) {
      await api.dispatch(apiSipsAuth.endpoints.logout.initiate());
    }

    // serialisasi parameter get
    const params = new URLSearchParams({
      ...blobArgs.params,
      ...pxid,
    });

    // mendapatkan token dari store dan menambahkan pada header
    const headers = {
      'x-authorization-token-sipp': token(api.getState()),
      ...blobArgs.headers,
    };

    config.fileCache = config.fileCache ? config.fileCache : true;
    config.session = blobCacheSlice.reducerPath;

    // mengambil dari local storage jika ada
    // const state = api.getState() as RootState;
    const customKey = blobArgs.cacheOptions?.key;
    const cacheKey = blobArgs.url + (customKey ? customKey : '');

    const cache = await api
      .dispatch(
        loadCache({
          key: cacheKey,
          encoding: config.appendExt === 'jpeg' ? 'base64' : 'utf8',
          isJson: config.appendExt !== 'jpeg',
        }),
      )
      .unwrap();

    if (cache) {
      return {data: cache};
    }

    // if (cacheKey in state.blobCache) {
    //   const path = state.blobCache[cacheKey];
    //   if (path) {
    //     let d: ApiSipsCachedResponse = {
    //       cacheKey,
    //       cachePath: path,
    //       metadata: {code: 200},
    //     };
    //     console.log('--------- gunakan hasilperiksa path: ', path);
    //     if (config.appendExt) {
    //       d.response = path;
    //     } else {
    //       const content = await ReactNativeBlobUtil.fs.readFile(path, 'utf8');
    //       const decoded = JSON.parse(content) as SipsJsonResponse;

    //       if ('metadata' in decoded) {
    //         // respons default
    //         d.metadata = (decoded as SipsJsonResponse).metadata;
    //         d.response = (decoded as SipsJsonResponse).response;
    //       } else if ('study' in decoded) {
    //         // respons adalah pacs respons
    //         d.response = decoded as SipsPacsResponse;
    //       } else {
    //         // error
    //       }
    //     }
    //     return {data: d};
    //   }
    // }

    /**
     * Fungsi untuk melakukan http request
     */
    const request = () =>
      ReactNativeBlobUtil.config(config)
        .fetch(method, baseUrl + blobArgs.url + '?' + params, headers, body)
        .then(async r => {
          const info = r.info();
          // kita memberi tipe data yang nantinya bakal di konversi ke unknown
          // lalu sama endpoint di override jadi tipe data lain.
          // gimana kalau diseragamkan sejak awal untuk semua respons dari bq ini?
          // endpoint tinggal memilih jenis responsnya apakah metadata/pacs/blob?
          let d: ApiSipsCachedResponse = {
            cachePath: r.path(),
            cacheKey: cacheKey,
            metadata: {code: info.status},
          };

          if (info.respType === 'json') {
            const decoded = await r.json();

            if ('metadata' in decoded) {
              // respons default
              d.metadata = (decoded as SipsJsonResponse).metadata;
              d.response = (decoded as SipsJsonResponse).response;
            } else if ('study' in decoded) {
              // respons adalah pacs respons
              d.response = decoded as SipsPacsResponse;
            } else {
              // error
            }
          } else {
            // blob
            // d.response = d.cachePath;
          }

          return d;
        });

    // kirim request pertama
    let result = await request();

    // jika gagal karena token expired, maka lakukan login kembali
    // dan kirim ulang request
    if (result.metadata.message === 'Token Provided token is expired.') {
      await relogin(api);
      result = await request();
    }

    // jika gagal selain token, kembalikan error
    if (result.metadata.code !== 200) {
      return {
        error: {
          status: result.metadata.code,
          error: result.metadata.message,
          data: result.response,
        },
      };
    }

    return {data: result};
  };
};
