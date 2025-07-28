import { api } from "../../../shared/api/api";
import { Notification } from "../types/Notification";

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUnreadNotifications: builder.query<Notification[], void>({
      query: () => "recordings-notifications",
      providesTags: ["Notification"],
    }),
    markAllNotificationsAsSeen: builder.mutation<Notification[], void>({
      query: () => ({
        url: "recordings-notifications/mark-all-seen",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetUnreadNotificationsQuery,
  useMarkAllNotificationsAsSeenMutation,
} = notificationsApi;
