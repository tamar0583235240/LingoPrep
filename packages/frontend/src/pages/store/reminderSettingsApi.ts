// // store/apis/reminderSettingsApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { UserReminderSetting } from "../../features/reminders/types/reminderType";
// type ReminderSettingsResponse = {
//   tip?: UserReminderSetting;
//   practice?: UserReminderSetting;
// };

// export const reminderSettingsApi = createApi({
//   reducerPath: "reminderSettingsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   endpoints: (builder) => ({
//     getReminderSettings: builder.query<ReminderSettingsResponse, string>({
//       query: (userId) => `reminder-settings/${userId}`,
//     }),
//   }),
// });

// export const { useGetReminderSettingsQuery } = reminderSettingsApi;
// store/apis/reminderSettingsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserReminderSetting } from "../../features/reminders/types/reminderType";

type ReminderSettingsResponse = {
  tip?: UserReminderSetting;
  practice?: UserReminderSetting;
};

export const reminderSettingsApi = createApi({
  reducerPath: "reminderSettingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["ReminderSettings"], // ✅ הוספת תגיות
  endpoints: (builder) => ({
    // שליפת הגדרות
    getReminderSettings: builder.query<ReminderSettingsResponse, string>({
      query: (userId) => `reminder-settings/${userId}`,
      providesTags: ["ReminderSettings"], // ✅ כך אפשר לחדש אותם אוטומטית אחרי עדכון
    }),

    // עדכון הגדרות
    updateReminderSettings: builder.mutation<
      void, // או אפשר להחזיר את ההגדרות החדשות
      { userId: string; settings: Partial<UserReminderSetting>[] }
    >({
      query: ({ userId, settings }) => ({
        url: `reminder-settings/${userId}`,
        method: "PUT",
        body: settings,
      }),
      // invalidatesTags: ["ReminderSettings"], // ✅ כך ה-query יתעדכן אוטומטית
      invalidatesTags: (result, error, { userId }) => [{ type: "ReminderSettings", id: userId }],
    }),
  }),
});

export const {
  useGetReminderSettingsQuery,
  useUpdateReminderSettingsMutation,
} = reminderSettingsApi;
