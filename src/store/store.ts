import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {sessionSlice} from './session/session';
import {useDispatch} from 'react-redux';
import {blobCacheSlice} from './cache/cache';
import {apiSipsCached} from './api/sips/cached/endpoints';
import {apiSipsAuth} from './api/sips/auth/endpoints';

// Tempat untuk register state beserta fungsi reducernya
const rootReducer = combineReducers({
  [sessionSlice.reducerPath]: sessionSlice.reducer,
  [blobCacheSlice.reducerPath]: blobCacheSlice.reducer,
  [apiSipsCached.reducerPath]: apiSipsCached.reducer,
  [apiSipsAuth.reducerPath]: apiSipsAuth.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    sessionSlice.reducerPath,
    blobCacheSlice.reducerPath,
    'preference',
    'lupapassword',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiSipsAuth.middleware)
      .concat(apiSipsCached.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
export type RootState = ReturnType<typeof store.getState>;
