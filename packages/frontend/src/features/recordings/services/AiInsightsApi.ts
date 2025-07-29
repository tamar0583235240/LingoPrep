import { api } from "../../../shared/api/api";
import { AiInsightsType } from "../types/AiInsightsType";



export const AiInsightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAiInsightsByAnswerId: builder.query<AiInsightsType[], string>({
      query: (answerId) => `api/AiInsights/getAiInsightsByAnswerId/${answerId}`,
      providesTags: ["AiInsights"],
    }),
    getAiInsights:builder.query<AiInsightsType[], void>({
      query: () => `api/AiInsights/getAiInsights`,
      providesTags: ["AiInsights"],
    })
  }),
});

export const {
  useGetAiInsightsByAnswerIdQuery,useGetAiInsightsQuery
} = AiInsightsApi;

