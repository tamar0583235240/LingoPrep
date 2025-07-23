import { api } from "../../../shared/api/api";
import { feedbackType } from "../types/feedbackType";

export const feedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbackesBysharedRecordingId: builder.query<feedbackType[], string>({
      query: (sharedRecordingId) =>
        `api/feedbacks/getFeedbackesByanswerId/${sharedRecordingId}`,
      providesTags: ["Feedback"],
    }),
    getAllFeedbacks: builder.query<feedbackType[], string>({
      query: (userId) => `api/feedbacks/${userId}`,
      providesTags: ["Feedback"],
    }),
  }),
});

export const {
  useGetFeedbackesBysharedRecordingIdQuery,
  useGetAllFeedbacksQuery,
} = feedbackApi;