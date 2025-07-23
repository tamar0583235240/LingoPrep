import { api } from "../../../shared/api/api";
import { aiInsightsType } from "../types/aiInsightsType";

export const aiInsightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAiInsights: builder.query<aiInsightsType[], void>({
      query: () => "/AiInsights/getAiInsights",
      providesTags: ["AiInsights"],
    }),
    getAiInsightsByAnswerId: builder.query<aiInsightsType[], string>({
      query: (answerId) => `/AiInsights/getAiInsightsByAnswerId/${answerId}`,
      providesTags: ["AiInsights"],
    }),
  }),
});

export const {
  useGetAiInsightsQuery,
  useGetAiInsightsByAnswerIdQuery,
} = aiInsightsApi;

