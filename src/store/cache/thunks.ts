import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import {
  ApiSipsCachedResponse,
  SipsJsonResponse,
  SipsPacsNormalizedResponse,
} from '@store/api/sips/types';
import {RootState, store} from '@store/store';
import ReactNativeBlobUtil, {Encoding} from 'react-native-blob-util';
import {add, blobCacheSlice} from './cache';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const readCache = (key: string) => {
  const state: RootState = store.getState();
  const path = state[blobCacheSlice.reducerPath][key];
  if (path) {
    return ReactNativeBlobUtil.fs
      .readFile(path, 'utf8')
      .then(v => JSON.parse(v) as SipsJsonResponse);
  }
};

type LoadCacheArgs = {key: string; encoding?: Encoding; isJson?: boolean};
type PersistCacheArgs = {key: string; value: string};

/**
 * Menangani load cache dari internal storage,
 * mulai dari mendapatkan path file dari redux store,
 * hingga read dan decode content.
 */
export const loadCache = createAsyncThunk(
  blobCacheSlice.reducerPath + '/loadCache',
  async ({key, encoding = 'utf8', isJson = true}: LoadCacheArgs, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const path = state[blobCacheSlice.reducerPath][key];
    if (path) {
      let retval: ApiSipsCachedResponse = {
        cacheKey: key,
        cachePath: path,
        metadata: {code: 200},
      };
      const content = await ReactNativeBlobUtil.fs.readFile(path, encoding);

      if (isJson) {
        const decoded = JSON.parse(content);
        if (typeof decoded === 'object') {
          if ('metadata' in decoded) {
            retval.metadata = decoded.metadata;
          }

          if ('response' in decoded) {
            retval.response = decoded.response;
          } else {
            retval.response = decoded;
          }
        }
      } else {
        retval.response = content;
      }

      console.log('use cache', encoding, isJson, key, path);

      return retval;
    }
  },
);

export const persistCache = createAsyncThunk(
  blobCacheSlice.reducerPath + '/persistCache',
  async ({key, value}: PersistCacheArgs) => {
    const path = ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + key;
    const strem = await ReactNativeBlobUtil.fs.writeStream(path, 'utf8');
    await strem.write(value);
    await strem.close();

    ReactNativeBlobUtil.session(blobCacheSlice.reducerPath).add(path);

    return {key, path};
  },
);

export const persistCache_ = (key: string, value: string) => {
  store.dispatch(add({key, value}));
  ReactNativeBlobUtil.fs
    .writeStream(ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + key, 'utf8')
    .then(async stream => await stream.write(value));
};

const fetchAllSeriesWithThumbnail = async (no_rontgen: string) => {
  // mengambil data studi
  const studiesResult = await store.dispatch(
    apiSipsCached.endpoints.pacsStudies.initiate(no_rontgen, {
      subscribe: false,
    }),
  );

  // terjadi error
  if (!studiesResult.data) {
    throw studiesResult.error;
  }

  // simplifikasi struktur data dan mengambil thumbnail
  const studies = studiesResult.data.response;

  if (!studies) {
    throw {error: 'tidak ada studi'};
  }

  const allSeries: SipsPacsNormalizedResponse = [];
  for (let i = 0; i < studies.study.series.length; i++) {
    const series = studies.study.series[i];
    const objects: SipsPacsNormalizedResponse[any]['objects'] = series.objects
      .map(o => ({
        number: o.dicomMetadata.instanceNumber,
        uid: o.dicomMetadata.sopInstanceUid,
        uri: '',
      }))
      .sort((a, b) => a.number - b.number);

    // mengambil gambar untuk thumbnail
    const pacsImageResult = await store.dispatch(
      apiSipsCached.endpoints.pacsImage.initiate(
        {
          no_rontgen,
          seriesUid: series.dicomMetadata.SeriesInstanceUID,
          objectUid: series.objects[0].dicomMetadata.sopInstanceUid,
        },
        {subscribe: false},
      ),
    );

    if (!pacsImageResult.data) {
      throw pacsImageResult.error;
    }

    if (pacsImageResult.data) {
      objects[0] = {
        ...objects[0],
        uri: pacsImageResult.data.cachePath,
      };
    }

    allSeries[i] = {
      modality: series.dicomMetadata.modality,
      number: series.dicomMetadata.SeriesNumber,
      desc: series.dicomMetadata.SeriesDescription,
      uid: series.dicomMetadata.SeriesInstanceUID,
      objects,
    };
  }

  return allSeries;
};

export const displayAllSeries = async (no_rontgen: string) => {
  const key = 'allSeries'; // TODO: opo key ne?

  const cache = await readCache(key);

  if (cache) {
    return cache;
  }

  const allSeries = await fetchAllSeriesWithThumbnail(no_rontgen);

  persistCache({key, value: JSON.stringify(allSeries)});

  return allSeries;
  // first:
  // fetch studies
  // fetch thumbs
  // store locally
  // store in redux
  // ---
  // later:
  // load from redux
  // load from local storage
};
