import { api } from "../../../shared/api/api";
import { FeedbackInManager } from "../types/FeedbackInManager";
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
    // הוספת תזכורת
    addReminder: builder.mutation<any, { feedbackId: string,user_id:string }>({
      query: ({ feedbackId }) => ({
        url: `api/reminders`,
        method: "POST",
        body: { feedbackId },
      }),
      invalidatesTags: ["Feedback"],
    }),
    // מחיקת תזכורת
    removeReminder: builder.mutation<any, { feedbackId: string }>({
      query: ({ feedbackId }) => ({
        url: `api/reminders/${feedbackId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
    // עדכון תזכורת (דוגמה, אם יש צורך)
    updateReminder: builder.mutation<any, { feedbackId: string; data: any }>({
      query: ({ feedbackId, data }) => ({
        url: `api/reminders/${feedbackId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
  useGetFeedbackesBysharedRecordingIdQuery,
  useGetFeedbackAveragesQuery,
  useGetAllFeedbacksQuery,
  useAddReminderMutation,
  useRemoveReminderMutation,
  useUpdateReminderMutation,
} = feedbackApi;
