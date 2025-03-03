import Config from 'react-native-config';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {resetGenericPassword, setGenericPassword} from 'react-native-keychain';
import type {SipsResponse} from './types';

export const sipsApiAuth = createApi({
  reducerPath: 'sips/api/auth',
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
      queryFn: async () => ({data: await resetGenericPassword()}),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const {useLoginQuery} = sipsApiAuth;
