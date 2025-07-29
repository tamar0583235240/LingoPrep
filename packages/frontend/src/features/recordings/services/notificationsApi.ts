import { api } from "../../../shared/api/api";

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUnreadNotifications: builder.query({
      query: () => `recordings-notifications/`,
      providesTags: ["Notification"],
    }),
    markAllNotificationsAsSeen: builder.mutation({
      query: () => ({
        url: `recordings-notifications/mark-all-seen`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markNotificationAsSeen: builder.mutation({
      query: (id: string) => ({
        url: `recordings-notifications/${id}/mark-seen`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetUnreadNotificationsQuery,
  useMarkAllNotificationsAsSeenMutation,
  useMarkNotificationAsSeenMutation,
} = notificationsApi;
