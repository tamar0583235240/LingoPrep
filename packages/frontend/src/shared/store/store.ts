import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../shared/api/api";
import { statsApi } from "../../features/activity-Moonitoring/services/statsApi";
import auth from "../../features/auth/store/authSlice"
// frontend\src\features\auth\store\authSlice.ts"

export const store = configureStore({
  reducer: {
    auth, // שם ה־slice ב־state
    [api.reducerPath]: api.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(statsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
