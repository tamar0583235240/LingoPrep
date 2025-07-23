// src/shared/api/statusService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const statusService = createApi({
  reducerPath: 'statusService',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getStatusByUserId: builder.query<boolean[], string>({
      query: (userId) => `status/${userId}`,
    }),
  }),
});

export const { useGetStatusByUserIdQuery } = statusService;