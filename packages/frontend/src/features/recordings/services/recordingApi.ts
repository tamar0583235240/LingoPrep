import { api } from "../../../shared/api/api";
import { Answer } from "../types/Answer";
import { UploadAnswerDto } from '../types/UploadAnswerDto';

export const recordingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAnswers: builder.query<Answer[], void>({
      query: () => "answers",
      providesTags: ["answers"],
    }),
    uploadAnswer: builder.mutation<Answer, UploadAnswerDto>({
      query: (answerData) => ({
        url: "api/answers",
        method: "POST",
        body: answerData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["answers"],
    }),
    deleteAnswer: builder.mutation<void, string>({
      query: (id) => ({
        url: `answers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["answers"],
    }),
  }),
});

export const {
  useGetAnswersQuery,
  useUploadAnswerMutation,
  useDeleteAnswerMutation,
} = recordingApi;