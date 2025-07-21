import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../../../shared/api/adminApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    // כאן תוכלי להוסיף reducers נוספים אם יש:
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});

// טיפוסים ל-useSelector ו-useDispatch בפרויקט שלך
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
