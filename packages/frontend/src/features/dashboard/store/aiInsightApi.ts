import { api } from "../../../shared/api/api";
import { AIInsight } from "../types/aiInsightsType";

export const aiInsightApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAIInsights: builder.query<AIInsight[], void>({
      query: () => ({
        url: "/aiInsight"
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAIInsightsQuery } = aiInsightApi;
