import {createAsyncThunk} from '@reduxjs/toolkit';
import {blobCacheSlice} from '@store/cache/cache';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {resetGenericPassword} from 'react-native-keychain';

/**
 * Logout sekaligus hapus data autentikasi.
 */
export const logout = createAsyncThunk('session/logout', async () => {
  await ReactNativeBlobUtil.session(blobCacheSlice.reducerPath).dispose();
  await resetGenericPassword();
});
