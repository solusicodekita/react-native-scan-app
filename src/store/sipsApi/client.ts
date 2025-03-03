import Config from 'react-native-config';
import {
  createApi,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {baseQueryWithToken, blobQuery, blobQueryWithToken} from './clientQuery';
import type {Pnj, SipsResponse} from './types';
import type {FetchBlobResponse} from 'react-native-blob-util';
import {REHYDRATE} from 'redux-persist';
import {Action} from '@reduxjs/toolkit';
import {RootState} from '@store/store';

type ItemResponseRiwayat = {
  tglmasukpenunjang: string;
  nama_pegawai: string;
  pasienmasukpenunjang_id_encrypted: Pnj;
};

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
  key: string;
  payload: RootState;
  err: unknown;
} {
  return action.type === REHYDRATE;
}

export const sipsApiClient = createApi({
  reducerPath: 'sips/api/client',
  baseQuery: blobQuery({
    baseUrl: Config.SIPS_API_BASE_URL,
  }),
  keepUnusedDataFor: 0,
  // extractRehydrationInfo(action, {reducerPath}): any {
  //   if (isHydrateAction(action)) {
  //     console.log('ish', action.key, reducerPath);
  //     // when persisting the api reducer
  //     if (action.key === 'sips/api/client') {
  //       console.log('hydrate', action.payload);
  //       // return action.payload;
  //     }

  //     // When persisting the root reducer
  //     // return action.payload[reducerPath];
  //   }
  // },
  endpoints: builder => ({
    hasilRadiologi: builder.query<SipsResponse, void>({
      query: () => ({
        url: '/hasilradiologi',
        method: 'GET',
        config: {
          fileCache: true,
        },
        // cacheOptions: {}
      }),
      // transformResponse: (returnValue: FetchBlobResponse, meta) => {
      //   // `meta` here contains our added `requestId` & `timestamp`, as well as
      //   // `request` & `response` from fetchBaseQuery's meta object.
      //   // These properties can be used to transform the response as desired.
      //   return 'cobi';
      // },
    }),
    hasilPatologiKlinik: builder.query<SipsResponse, void>({
      query: () => ({url: '/hasilpatologiklinik'}),
    }),
    hasilPatologiAnatomi: builder.query<SipsResponse, void>({
      query: () => ({url: '/hasilpatologianatomi'}),
    }),
    hasilMikrobiologiKlinik: builder.query<SipsResponse, void>({
      query: () => ({url: '/hasilmikrobiologilinik'}),
    }),
    farmasi: builder.query<SipsResponse, void>({
      query: () => ({url: '/farmasi'}),
    }),
    detailRadiologi: builder.query<SipsResponse, ItemResponseRiwayat>({
      query: ({
        tglmasukpenunjang,
        nama_pegawai,
        pasienmasukpenunjang_id_encrypted,
      }) => ({
        url: '/hasilradiologi/detail',
        method: 'GET',
        params: pasienmasukpenunjang_id_encrypted,
        config: {fileCache: true},
        cacheOptions: {key: tglmasukpenunjang + nama_pegawai},
      }),
    }),
    detailPatologiKlinik: builder.query<SipsResponse, Pnj>({
      query: pnj => ({url: '/hasilpatologiklinik/detail', params: pnj}),
    }),
    detailPatologiAnatomi: builder.query<SipsResponse, Pnj>({
      query: pnj => ({url: '/hasilpatologianatomi/detail', params: pnj}),
    }),
    detailMikrobiologiKlinik: builder.query<SipsResponse, Pnj>({
      query: pnj => ({url: '/hasilmikrobiologilinik/detail', params: pnj}),
    }),
    pemeriksaanTerakhir: builder.query<SipsResponse, void>({
      async queryFn(arg, api, extra) {
        try {
          const targets = [
            {
              alias: 'Radiologi',
              list: '/hasilradiologi',
              detail: '/hasilradiologi/detail',
            },
            {
              alias: 'Patologi Klinik',
              list: '/hasilpatologiklinik',
              detail: '/hasilpatologiklinik/detail',
            },
            {
              alias: 'Patologi Anatomi',
              list: '/hasilpatologianatomi',
              detail: '/hasilpatologianatomi/detail',
            },
            {
              alias: 'Mikrobiologi Klinik',
              list: '/hasilmikrobiologilinik',
              detail: '/hasilmikrobiologilinik/detail',
            },
          ];

          const request = async (url: string, params = {}) => {
            const {data, error} = await baseQueryWithToken(
              {url, params},
              api,
              extra,
            );

            if (error) {
              throw error;
            }

            return data;
          };

          const latest: {i: number; item: any} = {
            i: -1,
            item: {tglmasukpenunjang: ''},
          };
          for (let i = 0; i < targets.length; i++) {
            const data = await request(targets[i].list);

            if (data.response.length === 0) {
              continue;
            }

            // cari tglmasukpenunjang terbaru
            const lastItem = data.response[data.response.length - 1];
            if (latest.item.tglmasukpenunjang < lastItem.tglmasukpenunjang) {
              latest.i = i;
              latest.item = lastItem;
            }
          }

          if (latest.i === -1) {
            throw 'Belum ada pemeriksaan';
          }

          // get detail
          const target = targets[latest.i];
          const pnj = latest.item.pasienmasukpenunjang_id_encrypted;
          const data = await request(target.detail, {
            pnjid: pnj.pnjid,
            pnjiv: pnj.pnjv,
            pnjs: pnj.pnjs,
          });

          const nTindakan = data.response.length;
          const tindakan = data.response[0];
          const tindakanNama = tindakan.daftartindakan_nama;

          return {
            data: {
              metadata: {code: 200, message: 'ok'},
              response: {
                nama: target.alias,
                tindakan: `${tindakanNama} +${nTindakan}`,
                tgl: tindakan.tglmasukpenunjang,
              },
            },
          };
        } catch (err) {
          return {error: err as FetchBaseQueryError};
        }
      },
    }),
    pacsStudies: builder.query<SipsResponse, string>({
      query: no_rontgen => ({
        url: '/pacs/v2/study/' + no_rontgen,
        method: 'GET',
        config: {
          fileCache: true,
        },
      }),
      // transformResponse(r, meta, arg) {
      //   console.log('resp', r);
      //   return {
      //     metadata: {code: 200, message: 'string'},
      //     response: null,
      //   };
      // },
    }),
    // pacsStudies: builder.query<SipsResponse, string>({
    //   query: no_rontgen => ({url: '/pacs/v2/study/' + no_rontgen}),
    //   transformResponse(r, meta, arg) {
    //     console.log('resp', r);
    //     return {
    //       metadata: {code: 200, message: 'string'},
    //       response: null,
    //     };
    //   },
    //   // async onQueryStarted(body, api) {
    //   //   console.log('started', body);
    //   //   const r = await api.queryFulfilled;
    //   //   console.log('done', r);
    //   // },
    //   // async queryFn(no_rontgen, api, extra) {
    //   //   const {data, error} = await baseQueryWithToken({url: '/pacs/v2/study/' + no_rontgen}, api, extra);

    //   //   if (error) {
    //   //     return error;
    //   //   }

    //   //   return data;
    //   //   // const url = '/pacs/v2/study/' + no_rontgen;
    //   //   return await blobQueryWithToken(
    //   //     {url: '/pacs/v2/study/' + no_rontgen},
    //   //     api,
    //   //     {
    //   //       session: 'pacs/study/' + no_rontgen + '/series',
    //   //       fileCache: true,
    //   //     },
    //   //   );
    //   // },
    // }),
    pacsImage: builder.query<
      FetchBlobResponse,
      {no_rontgen: string; seriesUid: string; objectUid: string}
    >({
      async queryFn({no_rontgen, seriesUid, objectUid}, api) {
        const url = '/pacs/v2/image/' + no_rontgen;
        const params = new URLSearchParams({
          no: no_rontgen,
          '0020000E': seriesUid,
          '00080018': objectUid,
        });

        return await blobQueryWithToken({url: url + '?' + params}, api, {
          session: 'pacs/study/' + no_rontgen + '/objects',
          fileCache: true,
          appendExt: 'jpeg',
        });
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useHasilRadiologiQuery,
  useDetailRadiologiQuery,
  usePacsStudiesQuery,
  usePemeriksaanTerakhirQuery,
} = sipsApiClient;
