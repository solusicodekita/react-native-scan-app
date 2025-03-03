import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryDefinition,
} from '@reduxjs/toolkit/query';
import type {
  FetchBlobResponse,
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';
import type {
  ApiSipsCachedResponse,
  DetailRiwayatResponse,
  Pnj,
  SipsResponse,
} from '../types';

export type ExtraOptions = {withPasienIdParam?: boolean};

export type BaseQueryError = {status: number; data: SipsResponse};

export type BaseQuery = BaseQueryFn<
  FetchArgs,
  SipsResponse,
  FetchBaseQueryError,
  ExtraOptions
>;

export type BlobQuery = BaseQueryFn<
  FetchArgs,
  FetchBlobResponse,
  FetchBaseQueryError,
  ReactNativeBlobUtilConfig
>;

export type Methods =
  | 'POST'
  | 'GET'
  | 'DELETE'
  | 'PUT'
  | 'PATCH'
  | 'post'
  | 'get'
  | 'delete'
  | 'put'
  | 'patch';

type RNBlobUtilArgs = {
  url: string;
  method: Methods;
  params?: Record<string, string>;
  headers?: {[key: string]: string};
  body?: any | null;
  config?: ReactNativeBlobUtilConfig;
  cacheOptions?: {
    key?: string;
  };
};

export type BQ = BaseQueryFn<
  RNBlobUtilArgs,
  ApiSipsCachedResponse,
  FetchBaseQueryError
>;

export type ItemResponseRiwayat = {
  tglmasukpenunjang: string;
  nama_pegawai: string;
  pasienmasukpenunjang_id_encrypted: Pnj;
};

export type EndpointRiwayat =
  | 'hasilRadiologi'
  | 'hasilPatologiKlinik'
  | 'hasilPatologiAnatomi'
  | 'hasilMikrobiologiKlinik';

export type EndpointDetailRiwayat =
  | 'detailRadiologi'
  | 'detailPatologiKlinik'
  | 'detailPatologiAnatomi'
  | 'detailMikrobiologiKlinik';
