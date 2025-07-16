import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../../../shared/api/adminApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});

// טיפוסים ל-useSelector ו-useDispatch בפרויקט שלך
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
