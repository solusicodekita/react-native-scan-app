import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type {
  FetchBlobResponse,
  ReactNativeBlobUtilConfig,
} from 'react-native-blob-util';

export type SipsResponse =
  | {
      path?: string;
      cacheKey?: string;
    } & (
      | {
          metadata: {code: number; message: string};
          response?: any;
        }
      | {study: any}
    );

export type Pnj = {
  pnjid: string;
  pnjiv: string;
  pnjs: string;
};

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
