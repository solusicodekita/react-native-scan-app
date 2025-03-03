import type {SliceState} from './types';
import {createSlice} from '@reduxjs/toolkit';
import {apiSipsAuth} from '@store/api/sips/auth/endpoints';
import {logout} from './thunks';

const initialState: SliceState = {
  user: undefined,
  token: '',
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, () => ({
        ...initialState,
      }))
      .addMatcher(
        apiSipsAuth.endpoints.login.matchFulfilled,
        (state, action) => {
          if ('response' in action.payload) {
            const response = action.payload.response;
            state.token = response.token;
            state.user = response.datapasien;
          }
        },
      )
      .addMatcher(apiSipsAuth.endpoints.logout.matchFulfilled, () => ({
        ...initialState,
      }));
  },
});

export const sessionReducer = sessionSlice.reducer;
