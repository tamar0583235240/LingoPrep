import { api } from '../../../shared/api/api'; 

export const statusApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAnsweredQuestions: builder.query<{
      question: any;id: string
}[], { userId: string; categoryId: string }>({
      query: ({ userId, categoryId }) =>
        `/api/status/answers/user/${userId}/category/${categoryId}`,
    }),
  }),
});

export const { useGetAnsweredQuestionsQuery } = statusApi;