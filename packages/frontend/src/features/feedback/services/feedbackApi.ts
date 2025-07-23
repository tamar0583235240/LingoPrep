import { api } from "../../../shared/api/api";
import { FeedbackInManager } from "../types/FeedbackInManager";
// import { FeedbackType } from "../types/FeedbackType";
import { FeedbackType } from "../types/FeedbackType";

export const FeedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbackesBysharedRecordingId: builder.query<FeedbackType[], string>({
      query: (sharedRecordingId) => `api/feedbackes/getFeedbackesByanswerId/${sharedRecordingId}`,
      providesTags: ["Feedback"],
    }),
    getFeedbackAverages: builder.query<{
      relevance: string;
      tips: string;
      ai: string;
      usability: string;
    }, void>({
      query: () => "api/admin/feedbackes/averages",
    }),
     getAllFeedbacks: builder.query<FeedbackInManager[], void>({
      query: () => "api/admin/feedbackes/getAllFeedbacks",
    }),
     createFeedback: builder.mutation<void, {
      sharedRecordingId: string;
      givenByUserId: string;
      comment: string;
      rating: number;
    }>({
      query: (body) => ({
        url: `api/feedbackes`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Feedback"],
    }),
    updateFeedback: builder.mutation<void, {
      id: string;
      comment: string;
      rating: number;
    }>({
      query: ({ id, ...body }) => ({
        url: `api/feedbackes/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Feedback"],
    }),

  }),
});

export const {
  useGetFeedbackesBysharedRecordingIdQuery,
  useGetFeedbackAveragesQuery,
  useGetAllFeedbacksQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation
} = FeedbackApi;
