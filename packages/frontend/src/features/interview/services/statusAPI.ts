import { api } from '../../../shared/api/api'; 

export const statusApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAnsweredQuestions: builder.query<string[], { userId: string; categoryId: string }>({
      query: ({ userId, categoryId }) =>
        `answers/user/${userId}/category/${categoryId}`,
    }),
  }),
});

export const { useGetAnsweredQuestionsQuery } = statusApi;