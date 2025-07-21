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

<<<<<<< HEAD
export const { useGetStatusByUserIdQuery } = statusService;
=======
export const { useGetStatusByUserIdQuery } = statusService;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
