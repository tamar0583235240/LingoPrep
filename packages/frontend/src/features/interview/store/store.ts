// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { questionsApi } from '../services/questionsApi';
import { categoriesApi } from '../services/categoriesApi';
import answeredReducer from './answeredSlice';

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
import storage from 'redux-persist/lib/storage'; // localStorage כברירת מחדל

// שילוב כל הרדיוסרים
const rootReducer = combineReducers({
  [questionsApi.reducerPath]: questionsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  answered: answeredReducer,
});

// הגדרות persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['answered'], // רק answered יישמר
};

// רדיוסר עם persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// יצירת store עם middleware של RTK Query ותמיכה ב-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(questionsApi.middleware, categoriesApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;