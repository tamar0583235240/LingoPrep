import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { interviewType } from '../types/questionType';

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
<<<<<<< HEAD
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
=======
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  endpoints: (builder) => ({
    getAllQuestions: builder.query<interviewType[], void>({
      query: () => 'questions',
    }),
    getQuestionsByCategory: builder.query<interviewType[], string>({
      query: (categoryId) => `questions/category/${categoryId}`,
    }),
  }),
});

<<<<<<< HEAD
export const { useGetAllQuestionsQuery, useGetQuestionsByCategoryQuery } = questionsApi;

=======
export const { useGetAllQuestionsQuery, useGetQuestionsByCategoryQuery } = questionsApi;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
