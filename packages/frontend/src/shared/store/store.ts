import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';
// shared/store/store.ts



export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware) ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
