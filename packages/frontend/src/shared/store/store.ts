<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
=======
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

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
import { api } from "../api/api";
import { questionsApi } from '../../features/interview/services/questionsApi';
import { categoriesApi } from "../../features/interview/services/categoriesApi";

import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';
<<<<<<< HEAD
import simulationReducer from '../../features/interview/store/simulationSlice';
=======
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
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

const persistConfig = {
  key: 'root',
  storage,
<<<<<<< HEAD
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: persistedUserReducer,
    auth: persistedAuthReducer,
    simulation: simulationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
=======
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
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
<<<<<<< HEAD

export const persistor = persistStore(store);
=======
export const setupStore = () => store;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
