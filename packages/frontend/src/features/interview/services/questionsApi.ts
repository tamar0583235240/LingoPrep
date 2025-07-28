import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { interviewType } from '../types/questionType';

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query<interviewType[], void>({
      query: () => 'questions',
    }),
    getQuestionsByCategory: builder.query<interviewType[], string>({
      query: (categoryId) => `questions/category/${categoryId}`,
    }),
  }),
});

export const { useGetAllQuestionsQuery, useGetQuestionsByCategoryQuery } = questionsApi;