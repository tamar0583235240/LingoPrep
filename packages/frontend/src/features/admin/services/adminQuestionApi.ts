import { api } from "../../../shared/api/api";
import { Question } from "../../recordings/types/Question";

export const AdminQuestionApi = api.injectEndpoints({

    endpoints: (builder) => ({
        addQuestion: builder.mutation<void, Question>({
            query: (question) => ({
                url: "questions/addQuestion",
                method: "POST",
                body: question,
            }),
            invalidatesTags: ["question"],
        }),
        getAllQuestions: builder.query<Question[], void>({

            query: () => 'questions/getAllQuestions',

            providesTags: ['question'],
        }),
        updateQuestion: builder.mutation<Question, Partial<Question>>({
            query: (data) => ({
                url: `questions/updateQuestion`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["question"],
        }),
        deleteQuestionById: builder.mutation<string, string>({
            query: (id) => ({
                url: `questions/deleteQuestionById/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['question'],
        }),
    }),
});


export const { useGetAllQuestionsQuery, useDeleteQuestionByIdMutation, useAddQuestionMutation, useUpdateQuestionMutation } = AdminQuestionApi;

