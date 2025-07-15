
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // תעדכני לפי השרת שלך
  }),
  tagTypes: ['shared_recordings', 'Feedback', 'AiInsights', 'answers', 'question'],
  endpoints: () => ({}),
});
