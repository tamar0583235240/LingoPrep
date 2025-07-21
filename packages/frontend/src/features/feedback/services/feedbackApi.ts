import { api } from "../../../shared/api/api";
import { FeedbackInManager } from "../types/FeedbackInManager";
// import { FeedbackType } from "../types/FeedbackType";
import { FeedbackType } from "../types/feedbackType";

export const feedbackApi = api.injectEndpoints({
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
  }),
});

export const {
  useGetFeedbackesBysharedRecordingIdQuery,
  useGetFeedbackAveragesQuery,
  useGetAllFeedbacksQuery
} = feedbackApi;
