import { api } from "../../../shared/api/api";
import { aiInsightsType } from "../types/aiInsightsType";

export const aiInsightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAiInsights: builder.query<aiInsightsType[], void>({
      query: () => "/AiInsights/getAiInsights",
      providesTags: ["users"],
    }),
    getAiInsightsByAnswerId: builder.query<aiInsightsType[], string>({
      query: (answerId) => `/AiInsights/getAiInsightsByAnswerId/${answerId}`,
      providesTags: ["users"],
    }),
    addItem: builder.mutation<aiInsightsType, Partial<aiInsightsType>>({
      query: (item) => ({
        url: "/AiInsights/addInsight",  // שימי לב לשנות לפי הנתיב המדויק להוספה
        method: "POST",                 // הוספה היא POST, לא GET
        body: item,
      }),
      invalidatesTags: ["users"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/AiInsights/deleteInsight/${id}`, // נתיב מחיקה מדויק
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAiInsightsQuery,
  useGetAiInsightsByAnswerIdQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = aiInsightsApi;
