// // // src/app/store.ts
// // import { configureStore } from "@reduxjs/toolkit";
// // import { api } from "../api/api";
// // // import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
// // export const store = configureStore({
// //   reducer: {
// //     [api.reducerPath]: api.reducer,
// //     // example: exampleSlice,
// //   },
// //   middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware().concat(api.middleware),
// // });

// // export type RootState = ReturnType<typeof store.getState>;
// // export type AppDispatch = typeof store.dispatch;


// // src/app/store.ts
// import { configureStore, UnknownAction } from "@reduxjs/toolkit";
// import { api } from "../api/api";
// // import exampleReducer from "../features/example/exampleSlice"; // ← עדכן נתיב לפי המבנה שלך

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     example: exampleReducer, // ← זה שם ה־slice כפי שיוגדר ב־useSelector: state.example
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// // טיפוסים לשימוש בפרויקט
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// function exampleReducer(state: unknown, action: UnknownAction): unknown {
//   throw new Error("Function not implemented.");
// }

// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import reminderSlice from '../../features/reminders/store/exampleSlice'

import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';
import { profilesApi } from "../../features/profile/services/profileApi";
import { reminderSettingsApi } from "../../pages/store/reminderSettingsApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
    [reminderSettingsApi.reducerPath]: reminderSettingsApi.reducer,
    example: exampleSlice,
    reminder: reminderSlice,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(profilesApi.middleware)
      .concat(reminderSettingsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const setupStore = () => store;
