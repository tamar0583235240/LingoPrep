import { configureStore } from "@reduxjs/toolkit";
import { statsApi } from "../services/statsApi";

export const store = configureStore({
  reducer: {
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(statsApi.middleware),
});

// טיפוס עבור useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

