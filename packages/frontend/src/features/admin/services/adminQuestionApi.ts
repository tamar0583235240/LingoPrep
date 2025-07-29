
import { api } from "../../../shared/api/api";
import { Question } from "../../recordings/types/Question";
import { Category } from "../types/Categories";

export const AdminQuestionApi = api.injectEndpoints({

    endpoints: (builder) => ({
        addQuestion: builder.mutation<void, { question: Question; id_category: string }>({
            query: ({ question, id_category }) => ({
                url: "question/addQuestion",
                method: "POST",
                body: { question:question, id_category: id_category },
            }),
            invalidatesTags: ["question"],
        }),
        getAllQuestions: builder.query<Question[], void>({
            query: () => 'question/getAllQuestions',
            providesTags: ['question'],
        }),
        updateQuestion: builder.mutation<Question, { data: Partial<Question>; category: Category }>({
            query: ({ data, category }) => ({
                url: 'question/updateQuestion', 
                method: "PUT",
                body: {data,category}
            }),
            invalidatesTags: ["question"],
        }),
        deleteQuestionById: builder.mutation<string, string>({
            query: (id) => ({
                url: `question/deleteQuestionById/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['question'],
        }),
        getAllCategories: builder.query<Category[], void>({
            query: () => '/api/categories',
            providesTags: ['Categories'],
        }),
        getCategoryForQuestion: builder.query<Category, string>({
            query: (id) => `/api/categories/getCategoryForQuestions/${id}`,
            providesTags: ['Categories'],
        }),
        addCategory: builder.mutation<void, string>({
            query: (name) => ({
                url: "/api/categories/addCategory",
                method: "POST",
                body: { name },
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});


export const { useGetAllQuestionsQuery, useDeleteQuestionByIdMutation, useAddQuestionMutation, useUpdateQuestionMutation, useGetAllCategoriesQuery, useGetCategoryForQuestionQuery , useAddCategoryMutation } = AdminQuestionApi;



