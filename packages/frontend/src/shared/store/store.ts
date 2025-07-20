// import { configureStore } from "@reduxjs/toolkit";
// import { api } from "../api/api";
// import authReducer from '../../features/auth/store/authSlice';
// import userReducer from '../../features/auth/store/userSlice';

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     user: userReducer,
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware) ,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { api } from "../api/api";
import { questionsApi } from '../../features/interview/services/questionsApi';
import { categoriesApi } from "../../features/interview/services/categoriesApi";

import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';
import exampleReducer from '../../features/exampleFeatures/store/exampleSlice';
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
  example: exampleReducer,
  simulation: simulationReducer,
  recording: recordingReducer,
  answered: answeredReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'example', 'simulation', 'recording', 'answered'], // reducers to persist
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
export const setupStore = () => store;
