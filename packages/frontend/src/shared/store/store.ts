import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "../api/api";
import { questionsApi } from '../../features/interview/services/questionsApi';
import { categoriesApi } from "../../features/interview/services/categoriesApi";

import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';
import simulationReducer from '../../features/interview/store/simulationSlice';
import recordingReducer from '../../features/recordings/store/recordingSlice';
import answeredReducer from '../../features/interview/store/answeredSlice';
import { profilesApi } from "../../features/profile/services/profileApi";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [questionsApi.reducerPath]: questionsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [profilesApi.reducerPath]: profilesApi.reducer,
  auth: authReducer,
  user: userReducer,
  simulation: simulationReducer,
  recording: recordingReducer,
  answered: answeredReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'simulation', 'recording', 'answered'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      api.middleware,
      questionsApi.middleware,
      categoriesApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const setupStore = () => store;
