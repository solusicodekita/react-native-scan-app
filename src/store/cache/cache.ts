import {createSlice} from '@reduxjs/toolkit';
// import type {FulfilledAction} from './types';
// import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import {apiSipsAuth} from '@store/api/sips/auth/endpoints';
import {persistCache} from './thunks';
import {logout} from '@store/session/thunks';

const initialState: Record<string, string | undefined> = {};

/**
 * Slice untuk menyimpan lokasi file cache
 * hasil react native blob util
 */
export const blobCacheSlice = createSlice({
  name: 'blobCache',
  initialState,
  reducers: {
    add(state, {payload}) {
      state[payload.key] = payload.value;
    },
    remove(state, {payload}) {
      delete state[payload];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, () => ({
        ...initialState,
      }))
      .addCase(persistCache.fulfilled, (state, {payload}) => {
        state[payload.key] = payload.path;
      })
      // .addMatcher<FulfilledAction>(
      //   action =>
      //     action.type.startsWith(apiSipsCached.reducerPath) &&
      //     action.type.endsWith('/fulfilled'),
      //   (state, action) => {
      //     if (action.payload.cacheKey) {
      //       console.log('update cache', action.payload.cacheKey);
      //       state[action.payload.cacheKey] = action.payload.cachePath;
      //     }
      //   },
      // )
      .addMatcher(apiSipsAuth.endpoints.logout.matchFulfilled, () => {
        return {...initialState};
      });
  },
});

export const {add, remove} = blobCacheSlice.actions;

export default blobCacheSlice.reducer;
