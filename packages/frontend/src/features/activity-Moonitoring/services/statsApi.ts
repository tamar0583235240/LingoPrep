import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PageStatsParams {
  from: string;
  to: string;
}

export interface PageStats {
  metric: string;
  total_visits: number;
  avg_time_sec: number;
}

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/monitoring",
    credentials: "include", // אם אתה עובד עם עוגיות
  }),
  endpoints: (builder) => ({
    getPageStats: builder.query<PageStats[], PageStatsParams>({
      query: ({ from, to }) => `state?from=${from}&to=${to}`,
    }),
  }),
});

export const { useGetPageStatsQuery } = statsApi;
