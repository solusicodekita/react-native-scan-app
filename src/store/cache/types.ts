import type {AsyncThunk} from '@reduxjs/toolkit';
import type {QueryActionCreatorResult} from '@reduxjs/toolkit/query';
import {ApiSipsCachedResponse} from '@store/api/sips/types';
import type {SipsResponse} from '@store/sipsApi/types';

type GenericAsyncThunk = AsyncThunk<
  ApiSipsCachedResponse,
  QueryActionCreatorResult<any>,
  any
>;

export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
