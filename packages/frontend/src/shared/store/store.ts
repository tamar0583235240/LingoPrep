import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { questionsApi } from '../../features/interview/services/questionsApi';
import { categoriesApi } from "../../features/interview/services/categoriesApi";
import simulationReducer from '../../features/interview/store/simulationSlice';
import recordingReducer from '../../features/recordings/store/recordingSlice';

// import { profilesApi } from ''; // לדוגמה

import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';
import { profilesApi } from "../../features/profile/services/profileApi";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
    recording: recordingReducer,
    user: userReducer,
    auth: authReducer,
    simulation: simulationReducer, // ✅ הוספה חשובה

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
