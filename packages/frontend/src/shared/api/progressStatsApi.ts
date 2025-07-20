import { api } from "./api";
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";

export const progressStatsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProgressStats: builder.query<ProgressStats, string>({
      query: (userId) => `/api/questions/progress/${userId}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProgressStatsQuery } = progressStatsApi;
