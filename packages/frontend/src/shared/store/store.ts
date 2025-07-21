// shared/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../shared/api/api";
import authReducer from "../../features/auth/store/authSlice";
import userReducer from "../../features/auth/store/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
