import { UUID } from "crypto";
import { api } from "../../../shared/api/api";
import { Question } from "../../recordings/types/Question";
import { Category } from "../types/Categories";

export const AdminQuestionApi = api.injectEndpoints({

    endpoints: (builder) => ({
        addQuestion: builder.mutation<void, Question>({
            query: (question) => ({
                url: "question/addQuestion",
                method: "POST",
                body: question,
            }),
            invalidatesTags: ["question"],
        }),
        getAllQuestions: builder.query<Question[], void>({
            query: () => 'question/getAllQuestions',
            providesTags: ['question'],
        }),
        updateQuestion: builder.mutation<Question, { data: Partial<Question>; category: Category }>({
            query: ({ data, category }) => ({
                url: `question/updateQuestion`, 
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
        getAllCategories: builder.query<[Category], void>({
            query: () => '/api/categories',
            providesTags: ['categories'],
        }),
        addQuestionToCategory: builder.mutation<void, string[]>({
            query: ([question_id, category_id]) => ({
                url: "/api/categories/addQuestionToCategory",
                method: "POST",
                body: {
                    question_id: question_id,
                    category_id: category_id
                },
            }),
            invalidatesTags: ["question"],
        }),
        getCategoryForQuestion: builder.query<Category, string>({
            query: (id) => `/api/categories/getCategoryForQuestions/${id}`,
            providesTags: ['categories'],
        }),
    }),
});


export const { useGetAllQuestionsQuery, useDeleteQuestionByIdMutation, useAddQuestionMutation, useUpdateQuestionMutation , useGetAllCategoriesQuery ,useAddQuestionToCategoryMutation , useGetCategoryForQuestionQuery} = AdminQuestionApi;

