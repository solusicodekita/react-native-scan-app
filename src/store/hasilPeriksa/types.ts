import type {AsyncThunk} from '@reduxjs/toolkit';
import type {QueryActionCreatorResult} from '@reduxjs/toolkit/query';
import type {SipsResponse} from '@store/sipsApi/types';

type GenericAsyncThunk = AsyncThunk<
  SipsResponse,
  QueryActionCreatorResult<any>,
  any
>;

export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
