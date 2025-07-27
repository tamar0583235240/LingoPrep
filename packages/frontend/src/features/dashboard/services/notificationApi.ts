import { api } from "../../../shared/api/api";
import { Notification } from "../types/notificationType";

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsByUserId: builder.query<Notification[], string>({
      query: (userId) => `notifications/${userId}`,
      providesTags: ["Notification"],
    }),
    getAllCertificateNotifications: builder.query<Notification[], void>({
      query: () => "notifications/certificate",
      providesTags: ["Notification"],
    }),
    createCertificateNotification: builder.mutation<Notification, { userId: string; type: "download" | "print" }>({
      query: ({ userId, type }) => ({
        url: "notifications/certificate",
        method: "POST",
        body: { userId, type },
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});


export const { 
  useGetNotificationsByUserIdQuery, 
  useGetAllCertificateNotificationsQuery,
  useCreateCertificateNotificationMutation,
} = notificationApi;