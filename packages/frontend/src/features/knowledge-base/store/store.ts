// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { interviewMaterialsApi } from '../../../shared/api/interviewMaterialsApi';

export const store = configureStore({
  reducer: {
    // מוסיפים את reducer של ה-API
    [interviewMaterialsApi.reducerPath]: interviewMaterialsApi.reducer,
  },
  // מוסיפים את middleware של RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(interviewMaterialsApi.middleware),
});
