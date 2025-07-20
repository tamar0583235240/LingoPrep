// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import simulationSlice from '../../features/interview/store/simulationSlice';
import { questionsApi } from '../../features/interview/services/questionsApi'; 
import recordingSlice from '../../features/recordings/store/recordingSlice'
import { categoriesApi } from "../../features/interview/services/categoriesApi";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import answeredReducer from '../../features/interview/store/answeredSlice';


const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [questionsApi.reducerPath]: questionsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  example: exampleSlice,
  simulation: simulationSlice, 
  recording: recordingSlice,
  answered: answeredReducer, // הוספת answered
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['example', 'simulation', 'recording', 'answered'] // הוספת answered ל-whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      api.middleware,
      questionsApi.middleware,
      categoriesApi.middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;









