import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/store';

export const pasien_id_encrypted = createSelector(
  (state: RootState) => state.session.user,
  user => user?.pasien_id_encrypted,
);

export const token = createSelector(
  (state: RootState) => state.session,
  session => session.token,
);

export const selectUser = createSelector(
  (state: RootState) => state.session,
  session => session.user,
);

export const isLoggedIn = createSelector(
  (state: RootState) => state.session.user,
  user => user?.pasien_id_encrypted !== undefined,
);
