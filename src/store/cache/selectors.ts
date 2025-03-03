// import {createSelector} from '@reduxjs/toolkit';
// import {SipsJsonResponse} from '@store/api/sips/types';
import {blobCacheSlice} from './cache';
import {RootState} from '@store/store';
import {ReactNativeBlobUtil as RNBU} from 'react-native-blob-util';

// export const blobCache = createSelector(
//   state => state[blobCacheSlice.reducerPath],
//   b => b,
// );

// export const selectCache = (state: RootState, key: string) =>
//   state[blobCacheSlice.reducerPath][key];

export const selectCache = (state: RootState, key: string) => {
  const path = state[blobCacheSlice.reducerPath][key];
  if (path) {
    return RNBU.fs.readFile(path, 'utf8').then(v => JSON.parse(v));
  }
};
