<<<<<<< HEAD
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: 'include',
    }),
    reducerPath: "api",

    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question","shared_recordings","admin","users","DynamicContents"],
    endpoints: () => ({}),
});





=======

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // תעדכני לפי השרת שלך
  }),
  tagTypes: ['shared_recordings', 'Feedback', 'AiInsights', 'answers', 'question'],
  endpoints: () => ({}),
});
>>>>>>> f459e50e8a6f6d800c0cb3a76c28fffdc787329b
