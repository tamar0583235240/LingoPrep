// shared/api/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/api",

  }),
  reducerPath: "api",
  tagTypes: ["users", "questions", "answers", "insights"],
  endpoints: () => ({}),
});

