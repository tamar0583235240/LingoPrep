import { api } from "./api";

export interface SendPageTimeRequest {
  metric: string;
  timeSpentSec: number;
}

export interface PageStats {
  metric: string;
  total_visits: number;
  avg_time_sec: number;
}

export const activityMonitoringApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendPageTime: builder.mutation<void, SendPageTimeRequest>({
      query: (body) => ({
        url: "/monitoring",
        method: "POST",
        body,
      }),
    }),
    getPageStats: builder.query<PageStats[], { from: string; to: string }>({
      query: ({ from, to }) => ({
        url: `/monitoring/state`,
        method: "GET",
        params: { from, to },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSendPageTimeMutation,
  useGetPageStatsQuery,
} = activityMonitoringApi;
