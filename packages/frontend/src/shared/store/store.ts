import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { questionsApi } from '../../features/interview/services/questionsApi';
import { categoriesApi } from "../../features/interview/services/categoriesApi";

import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      api.middleware,
      questionsApi.middleware,
      categoriesApi.middleware,
      profilesApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const setupStore = () => store;
