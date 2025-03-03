import Config from 'react-native-config';
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getGenericPassword} from 'react-native-keychain';
import {sipsApiAuth} from './auth';
import type {
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import {pasien_id_encrypted, token} from '@store/session/selectors';
import type {
  BaseQuery,
  BlobQuery,
  ExtraOptions,
  Methods,
  SipsResponse,
} from './types';
import ReactNativeBlobUtil, {
  FetchBlobResponse,
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';
import {RootState} from '@store/store';

/**
 * Memicu fungsi login/logut berdasarkan ada tidaknya
 * username dan password di local storage.
 */
const relogin = async (api: BaseQueryApi) => {
  const credentials = await getGenericPassword();
  if (credentials) {
    await api.dispatch(
      sipsApiAuth.endpoints.login.initiate({
        no_rekam_medik: credentials.username,
        password: credentials.password,
      }),
    );
  } else {
    await api.dispatch(sipsApiAuth.endpoints.logout.initiate());
  }
};

/**
 * Memodifikasi parameter `args` berdasarkan parameter `extra`.
 */
const handleExtraOptions = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extra: ExtraOptions,
) => {
  // menambahkan query string pasien_id_encrypted secara default
  if (!extra || !extra.withPasienIdParam) {
    if (!pasien_id_encrypted(api.getState())) {
      await api.dispatch(sipsApiAuth.endpoints.logout.initiate());
    }

    args.params = {
      ...args.params,
      ...pasien_id_encrypted(api.getState()),
    };
  }
};

/**
 * Fungsi fetch dari Redux Toolkit Query
 * yang dilengkapi dengan header berisi token.
 * Token otomatis diambil dari Redux Store.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: Config.SIPS_API_BASE_URL,
  timeout: 60 * 1000,
  prepareHeaders: (headers, {getState}) => {
    headers.set('x-authorization-token-sipp', token(getState()));
    return headers;
  },
  validateStatus: (response, body) =>
    body?.metadata?.code === 200 || body?.study,
});

/**
 * Fungsi utama untuk komunikasi dengan backend SIPS.
 */
export const baseQueryWithToken: BaseQuery = async (args, api, extra) => {
  await handleExtraOptions(args, api, extra);

  let result = await baseQuery(args, api, extra);

  if (
    result.error &&
    result.error.status === 401 &&
    (result.error.data as SipsResponse).metadata.message ===
      'Token Provided token is expired.'
  ) {
    await relogin(api);
    result = await baseQuery(args, api, extra);
  }

  return result as QueryReturnValue<
    SipsResponse,
    FetchBaseQueryError,
    FetchBaseQueryMeta
  >;
};

type RNBlobUtilArgs = {
  url: string;
  method: Methods;
  params?: Record<string, string>;
  headers?: {[key: string]: string};
  body?: any | null;
  config?: ReactNativeBlobUtilConfig;
  cacheOptions?: {
    key?: string;
  };
};

type BQ = BaseQueryFn<RNBlobUtilArgs, unknown, FetchBaseQueryError>;

/**
 * Fungsi utama untuk komunikasi dengan backend SIPS.
 * Menggunakan library react-native-blob-util untuk fetch dan write
 * ke local storage.
 */
export const blobQuery = function (
  {baseUrl}: {baseUrl: string | undefined} = {baseUrl: ''},
): BQ {
  return async function ({config = {}, method, body, ...blobArgs}, api) {
    // mendapatkan pasien_id_encrypted dari store
    // untuk dikirim dalam setiap request
    const pxid = pasien_id_encrypted(api.getState());
    if (!pxid) {
      await api.dispatch(sipsApiAuth.endpoints.logout.initiate());
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

    if (config.fileCache) {
      config.session = 'sips/api/client' + blobArgs.url;
    }

    // mengambil dari local storage jika ada
    const cacheKey = blobArgs.url + blobArgs.cacheOptions?.key;
    const state = api.getState() as RootState;
    if (cacheKey in state.hasilPeriksa) {
      const path = state.hasilPeriksa[cacheKey];
      if (path) {
        console.log('--------- gunakan hasilperiksa path: ', path);
        const content = await ReactNativeBlobUtil.fs.readFile(path, 'utf8');
        return {data: JSON.parse(content)};
      }
    }

    /**
     * Fungsi untuk melakukan http request
     */
    const request = () =>
      ReactNativeBlobUtil.config(config)
        .fetch(method, baseUrl + blobArgs.url + '?' + params, headers, body)
        .then(async r => {
          let d: SipsResponse = await r.json();
          d.path = r.path();
          d.cacheKey = cacheKey;
          console.log('\n\n');
          console.log('new: ', r.path());
          return d;
        });

    // kirim request pertama
    let result = await request();
    console.log('--------- fetched');

    // jika gagal karena token expired, maka lakukan login kembali
    // dan kirim ulang request
    if (
      'metadata' in result &&
      result.metadata.message === 'Token Provided token is expired.'
    ) {
      await relogin(api);
      result = await request();
    }

    // jika gagal selain token, kembalikan error
    if ('metadata' in result && result.metadata.code !== 200) {
      return {
        error: {
          status: result.metadata.code,
          error: result.metadata.message,
          data: result.response,
        },
      };
    }

    // TODO: only return id untuk disimpan di cache? yes
    // atau ditentukan saja di tiap endpoint, karena bisa jadi strukturnya beda2, yes

    return {data: result};
  };
};

/**
 * Fungsi utama untuk komunikasi dengan backend SIPS.
 */
export const blobQueryWithToken: BlobQuery = async (args, api, config) => {
  try {
    const request = async () =>
      await ReactNativeBlobUtil.config(config).fetch(
        args.method as Methods,
        args.url,
        {'x-authorization-token-sipp': token(api.getState())},
      );

    let result: QueryReturnValue<
      FetchBlobResponse,
      FetchBaseQueryError,
      FetchBaseQueryMeta
    > = {data: await request()};

    if (result.data.respInfo.respType === 'json') {
      const json: SipsResponse = result.data.json();
      if (json.metadata.message === 'Token Provided token is expired.') {
        await relogin(api);
        result.data = await request();
      } else {
        // response berupa json dan gagal
        result = {error: {status: json.metadata.code, data: json}};
      }
    }

    return result;
  } catch (err) {
    return {error: {status: 'CUSTOM_ERROR', data: err}} as QueryReturnValue<
      FetchBlobResponse,
      FetchBaseQueryError,
      FetchBaseQueryMeta
    >;
  }
};
