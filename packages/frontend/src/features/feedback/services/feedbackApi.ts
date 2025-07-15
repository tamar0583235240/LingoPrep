import { api } from "../../../shared/api/api";
import { feedbackType } from "../types/feedbackType";

export const feedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacksBySharedRecordingId: builder.query<feedbackType[], string>({
      query: (sharedRecordingId) =>
        `/feedbackes/getFeedbackesByanswerId/${sharedRecordingId}`, // ודאי שהנתיב הזה נכון בשרת
      providesTags: ["Feedback"],
    }),

    createFeedback: builder.mutation<void, {
      sharedRecordingId: string;
      givenByUserId: string;
      comment: string;
      rating: number;
    }>({
      query: (body) => ({
        url: '/shared-recordings/feedback',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Feedback", "shared_recordings"],
    }),

    updateFeedback: builder.mutation<void, {
      id: string;
      comment: string;
      rating: number;
    }>({
      query: ({ id, ...body }) => ({
        url: `/shared-recordings/feedback/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ["Feedback", "shared_recordings"],
    }),
  }),
});

export const {
  useGetFeedbacksBySharedRecordingIdQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
} = feedbackApi;