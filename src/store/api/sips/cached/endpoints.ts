import type {
  ApiSipsCachedResponse,
  DetailRiwayatResponse,
  ItemRiwayat,
  // SipsPacsNormalizedResponse,
  SipsPacsResponse,
} from '../types';
import type {ItemResponseRiwayat} from './types';

import Config from 'react-native-config';
import {createApi} from '@reduxjs/toolkit/query/react';
import {cachedQuery} from './queryi';

// TODO: validasi respons supaya conform {metadata:...}
export const apiSipsCached = createApi({
  reducerPath: 'api/sips/cached',
  baseQuery: cachedQuery({
    baseUrl: Config.SIPS_API_BASE_URL,
  }),
  keepUnusedDataFor: 0,
  endpoints: builder => ({
    hasilRadiologi: builder.query<ApiSipsCachedResponse<ItemRiwayat[]>, void>({
      query: () => ({method: 'GET', url: '/hasilradiologi'}),
    }),
    hasilPatologiKlinik: builder.query<
      ApiSipsCachedResponse<ItemRiwayat[]>,
      void
    >({
      query: () => ({method: 'GET', url: '/hasilpatologiklinik'}),
    }),
    hasilPatologiAnatomi: builder.query<
      ApiSipsCachedResponse<ItemRiwayat[]>,
      void
    >({
      query: () => ({method: 'GET', url: '/hasilpatologianatomi'}),
    }),
    hasilMikrobiologiKlinik: builder.query<
      ApiSipsCachedResponse<ItemRiwayat[]>,
      void
    >({
      query: () => ({method: 'GET', url: '/hasilmikrobiologilinik'}),
    }),
    farmasi: builder.query<ApiSipsCachedResponse, void>({
      query: () => ({method: 'GET', url: '/farmasi'}),
    }),
    detailRadiologi: builder.query<
      ApiSipsCachedResponse<DetailRiwayatResponse[]>,
      ItemResponseRiwayat
    >({
      query: arg => ({
        url: '/hasilradiologi/detail',
        method: 'GET',
        params: arg.pasienmasukpenunjang_id_encrypted,
        cacheOptions: {key: arg.tglmasukpenunjang + arg.nama_pegawai},
      }),
    }),
    detailPatologiKlinik: builder.query<
      ApiSipsCachedResponse<DetailRiwayatResponse[]>,
      ItemResponseRiwayat
    >({
      query: arg => ({
        url: '/hasilpatologiklinik/detail',
        method: 'GET',
        params: arg.pasienmasukpenunjang_id_encrypted,
        cacheOptions: {key: arg.tglmasukpenunjang + arg.nama_pegawai},
      }),
    }),
    detailPatologiAnatomi: builder.query<
      ApiSipsCachedResponse<DetailRiwayatResponse[]>,
      ItemResponseRiwayat
    >({
      query: arg => ({
        url: '/hasilpatologianatomi/detail',
        method: 'GET',
        params: arg.pasienmasukpenunjang_id_encrypted,
        cacheOptions: {key: arg.tglmasukpenunjang + arg.nama_pegawai},
      }),
    }),
    detailMikrobiologiKlinik: builder.query<
      ApiSipsCachedResponse<DetailRiwayatResponse[]>,
      ItemResponseRiwayat
    >({
      query: arg => ({
        url: '/hasilmikrobiologilinik/detail',
        method: 'GET',
        params: arg.pasienmasukpenunjang_id_encrypted,
        cacheOptions: {key: arg.tglmasukpenunjang + arg.nama_pegawai},
      }),
    }),
    // pemeriksaanTerakhir: builder.query<ApiSipsCachedResponse, void>({
    //   async queryFn(arg, api, extra) {
    //     try {
    //       const targets = [
    //         {
    //           alias: 'Radiologi',
    //           list: '/hasilradiologi',
    //           detail: '/hasilradiologi/detail',
    //         },
    //         {
    //           alias: 'Patologi Klinik',
    //           list: '/hasilpatologiklinik',
    //           detail: '/hasilpatologiklinik/detail',
    //         },
    //         {
    //           alias: 'Patologi Anatomi',
    //           list: '/hasilpatologianatomi',
    //           detail: '/hasilpatologianatomi/detail',
    //         },
    //         {
    //           alias: 'Mikrobiologi Klinik',
    //           list: '/hasilmikrobiologilinik',
    //           detail: '/hasilmikrobiologilinik/detail',
    //         },
    //       ];

    //       const request = async (url: string, params = {}) => {
    //         const {data, error} = await baseQueryWithToken(
    //           {url, params},
    //           api,
    //           extra,
    //         );

    //         if (error) {
    //           throw error;
    //         }

    //         return data;
    //       };

    //       const latest: {i: number; item: any} = {
    //         i: -1,
    //         item: {tglmasukpenunjang: ''},
    //       };
    //       for (let i = 0; i < targets.length; i++) {
    //         const data = await request(targets[i].list);

    //         if (data.response.length === 0) {
    //           continue;
    //         }

    //         // cari tglmasukpenunjang terbaru
    //         const lastItem = data.response[data.response.length - 1];
    //         if (latest.item.tglmasukpenunjang < lastItem.tglmasukpenunjang) {
    //           latest.i = i;
    //           latest.item = lastItem;
    //         }
    //       }

    //       if (latest.i === -1) {
    //         throw 'Belum ada pemeriksaan';
    //       }

    //       // get detail
    //       const target = targets[latest.i];
    //       const pnj = latest.item.pasienmasukpenunjang_id_encrypted;
    //       const data = await request(target.detail, {
    //         pnjid: pnj.pnjid,
    //         pnjiv: pnj.pnjv,
    //         pnjs: pnj.pnjs,
    //       });

    //       const nTindakan = data.response.length;
    //       const tindakan = data.response[0];
    //       const tindakanNama = tindakan.daftartindakan_nama;

    //       return {
    //         data: {
    //           metadata: {code: 200, message: 'ok'},
    //           response: {
    //             nama: target.alias,
    //             tindakan: `${tindakanNama} +${nTindakan}`,
    //             tgl: tindakan.tglmasukpenunjang,
    //           },
    //         },
    //       };
    //     } catch (err) {
    //       return {error: err as FetchBaseQueryError};
    //     }
    //   },
    // }),
    pacsStudies: builder.query<ApiSipsCachedResponse<SipsPacsResponse>, string>(
      {
        query: no_rontgen => ({
          url: '/pacs/v2/study/' + no_rontgen,
          method: 'GET',
        }),
        // transformResponse: retval => {
        //   return {
        //     cacheKey: retval.cacheKey,
        //     cachePath: retval.cachePath,
        //     metadata: retval.metadata,
        //     response: (retval.response as SipsPacsResponse).study.series
        //       .map(s => ({
        //         modality: s.dicomMetadata.modality,
        //         number: s.dicomMetadata.SeriesNumber,
        //         desc: s.dicomMetadata.SeriesDescription,
        //         uid: s.dicomMetadata.SeriesInstanceUID,
        //         objects: s.objects
        //           .map(o => ({
        //             number: o.dicomMetadata.instanceNumber,
        //             uid: o.dicomMetadata.sopInstanceUid,
        //             uri: '',
        //           }))
        //           .sort((a, b) => a.number - b.number),
        //       }))
        //       .sort((a, b) => a.number - b.number),
        //   };
        // },
      },
    ),
    pacsImage: builder.query<
      ApiSipsCachedResponse,
      {no_rontgen: string; seriesUid: string; objectUid: string}
    >({
      query: ({no_rontgen, seriesUid, objectUid}) => ({
        url: '/pacs/v2/image',
        method: 'GET',
        params: {
          no: no_rontgen,
          '0020000E': seriesUid,
          '00080018': objectUid,
        },
        config: {
          fileCache: true,
          appendExt: 'jpeg',
        },
        // cacheOptions: {key: no_rontgen + seriesUid + objectUid},
      }),
      // transformResponse: (retval, meta, arg) => {
      //   console.log('trans');
      //   return retval;
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
    // pacsImage: builder.query<
    //   FetchBlobResponse,
    //   {no_rontgen: string; seriesUid: string; objectUid: string}
    // >({
    //   async queryFn({no_rontgen, seriesUid, objectUid}, api) {
    //     const url = '/pacs/v2/image/' + no_rontgen;
    //     const params = new URLSearchParams({
    //       no: no_rontgen,
    //       '0020000E': seriesUid,
    //       '00080018': objectUid,
    //     });

    //     return await blobQueryWithToken({url: url + '?' + params}, api, {
    //       session: 'pacs/study/' + no_rontgen + '/objects',

    //       appendExt: 'jpeg',
    //     });
    //   },
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // useHasilRadiologiQuery,
  useDetailRadiologiQuery,
  // usePacsStudiesQuery,
  // usePemeriksaanTerakhirQuery,
} = apiSipsCached;
