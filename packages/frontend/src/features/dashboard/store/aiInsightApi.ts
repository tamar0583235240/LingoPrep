import { api } from "../../../shared/api/api";
import { AIInsight } from "../types/aiInsightsType";

export const aiInsightApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAIInsights: builder.query<AIInsight[], void>({
      query: () => ({
url: "/api/aiInsights/getAiInsights"
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAIInsightsQuery } = aiInsightApi;
