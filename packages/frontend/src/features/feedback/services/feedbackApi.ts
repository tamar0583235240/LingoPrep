import { api } from "../../../shared/api/api";
import { feedbackType } from "../types/feedbackType";

export const feedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbackesBysharedRecordingId: builder.query<feedbackType[], string>({
      query: (sharedRecordingId) => `/feedback/getFeedbackesByanswerId/${sharedRecordingId}`,
      providesTags: ["Feedback"],
    })

  }),
});

export const {
  useGetFeedbackesBysharedRecordingIdQuery
} = feedbackApi;
