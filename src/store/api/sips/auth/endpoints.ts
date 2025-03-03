import Config from 'react-native-config';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {resetGenericPassword, setGenericPassword} from 'react-native-keychain';
import {SipsResponse} from '../types';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {apiSipsCached} from '../cached/endpoints';
import {blobCacheSlice} from '@store/cache/cache';

export const apiSipsAuth = createApi({
  reducerPath: 'api/sips/auth',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.SIPS_API_BASE_URL,
    timeout: 60 * 1000,
  }),
  endpoints: builder => ({
    login: builder.mutation<
      SipsResponse,
      {no_rekam_medik: string; password: string}
    >({
      query: ({no_rekam_medik, password}) => ({
        url: '/login',
        method: 'POST',
        body: {no_rekam_medik, password},
        responseHandler: async response => {
          const json = await response.json();

          // simpan username dan password ke secure storage
          // jika login berhasil
          if (json?.metadata?.code === 200) {
            await setGenericPassword(no_rekam_medik, password);
          }

          return json;
        },
      }),
    }),
    logout: builder.query<boolean | undefined, void>({
      queryFn: async () => {
        await ReactNativeBlobUtil.session(apiSipsCached.reducerPath).dispose();
        await ReactNativeBlobUtil.session(blobCacheSlice.reducerPath).dispose();
        return {data: await resetGenericPassword()};
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const {useLoginQuery} = apiSipsAuth;
