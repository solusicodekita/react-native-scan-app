import {useEffect, useState} from 'react';
import {type RootState, useAppDispatch} from '@store/store';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {persistCache} from '@store/cache/thunks';
import {useSelector} from 'react-redux';

export const useCache = <S = undefined>(
  key: string,
  fetch: (signal: UseCacheSignal) => Promise<S>,
  refetch?: boolean,
) => {
  const dispatch = useAppDispatch();
  const path = useSelector((state: RootState) => state.blobCache[key]);
  const [content, setContent] = useState<S>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!refetch && path) {
      ReactNativeBlobUtil.fs
        .readFile(path, 'utf8')
        .then(payload => JSON.parse(payload) as S)
        .then(value => setContent(value))
        .finally(() => setLoading(false));
    } else {
      const signal = {abort: false};

      fetch(signal)
        .then(r =>
          dispatch(
            persistCache({
              key,
              value: JSON.stringify(r),
            }),
          ).then(() => r),
        )
        .then(value => setContent(value))
        .finally(() => setLoading(false));

      // fungsi destructor
      return () => {
        signal.abort = true;
      };
    }
  }, [dispatch, fetch, key, path, refetch]);

  return [content, loading] as [S, boolean];
};

export const useCacheWithTransform = <S = undefined, T = any>(
  key: string,
  fetch: (signal: UseCacheSignal) => Promise<S>,
  transformResponse: (arg: S | undefined) => Promise<T>,
  refetch?: boolean,
) => {
  const dispatch = useAppDispatch();
  const path = useSelector((state: RootState) => state.blobCache[key]);
  const [content, setContent] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!refetch && path) {
      ReactNativeBlobUtil.fs
        .readFile(path, 'utf8')
        .then(value => JSON.parse(value) as S)
        .then(value => transformResponse(value) as T)
        .then(value => setContent(value))
        .finally(() => setLoading(false));
    } else {
      const signal = {abort: false};

      fetch(signal)
        .then(r =>
          dispatch(
            persistCache({
              key,
              value: JSON.stringify(r),
            }),
          ).then(() => r),
        )
        .then(value => transformResponse(value) as T)
        .then(value => setContent(value))
        .finally(() => setLoading(false));

      // fungsi destructor
      return () => {
        signal.abort = true;
      };
    }
  }, [dispatch, fetch, key, path, refetch, transformResponse]);

  return [content, loading] as [T, boolean];
};

export type UseCacheSignal = {abort: boolean};
