import {createSelector, createSlice} from '@reduxjs/toolkit';
import {FulfilledAction} from './types';
import {RootState} from '@store/store';

const initialState: Record<string, string | undefined> = {};

export const hasilPeriksaSlice = createSlice({
  name: 'hasilPeriksa',
  initialState,
  reducers: {
    add(state, {payload}) {
      state[payload.key] = payload.value;
    },
  },
  extraReducers: builder => {
    builder.addMatcher<FulfilledAction>(
      action =>
        action.type.startsWith('sips/api/client/') &&
        action.type.endsWith('/fulfilled'),
      (state, action) => {
        if (action.payload.cacheKey) {
          state[action.payload.cacheKey] = action.payload.path;
        }
      },
    );
  },
});

export const {add} = hasilPeriksaSlice.actions;

export default hasilPeriksaSlice.reducer;

export const getCacheData = (key: string) =>
  createSelector(
    (state: RootState) => state.hasilPeriksa,
    h => h[key],
  );
