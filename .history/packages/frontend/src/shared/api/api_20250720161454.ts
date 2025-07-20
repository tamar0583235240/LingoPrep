// // // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // // export const api = createApi({
// // //   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
// // //   reducerPath: "api",
// // //   // tagTypes: ["Reminder"],
// // //   tagTypes: ["Item"],
// // //   endpoints: (builder) => ({
// // //     saveUserReminderSettings: builder.mutation<
// // //       void,
// // //       { userId: string; settings: Record<string, string> }
// // //     >({
// // //       query: ({ userId, settings }) => ({
// // //         url: "/reminders/settings",
// // //         method: "POST",
// // //         body: { userId, settings },
// // //       }),
// // //     }),
// // //   }),
// // // });

// // // export const { useSaveUserReminderSettingsMutation } = api;
// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import { UserReminderSetting } from "../../features/reminders/types/reminderType";


// // export const api = createApi({
// //   reducerPath: "api", 
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: "http://localhost:5000/api/", 
// //   }),
// //   tagTypes: ["Reminders"],

// //   endpoints: (builder) => ({
    
// //     getReminders: builder.query<UserReminderSetting[], void>({
// //       query: () => "tips",
// //       providesTags: ["Reminders"],
// //     }),

// //     saveUserReminderSettings: builder.mutation<
// //       void,
// //       {
// //         userId: string;
// //         settings: Record<string, string>;
// //       }
// //     >({
// //       query: ({ userId, settings }) => ({
// //         url: "reminders/settings", 
// //         method: "POST",
// //         body: { userId, settings },
// //       }),
// //       invalidatesTags: ["Reminders"], 
// //     }),
// //   }),
// // });

// // export const {
// //   useGetRemindersQuery,
// //   useSaveUserReminderSettingsMutation,
// // } = api;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { ReminderSelection, ReminderType } from '../../features/reminders/types/reminderType';
// // import { UserReminderSetting, ReminderType, ReminderSelection } from '../types/reminderType';

// interface SaveReminderSettingsRequest {
//   userId: string;
//   settings: Record<ReminderType, ReminderSelection>;
// }

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
//   tagTypes: ['Reminders'],
//   endpoints: (builder) => ({
//     getUserReminderSettings: builder.query<Record<ReminderType, ReminderSelection>, string>({
//       query: (userId) => `/reminder-settings/${userId}`,
//       providesTags: ['Reminders'],
//     }),
//     saveUserReminderSettings: builder.mutation<void, SaveReminderSettingsRequest>({
//       query: ({ userId, settings }) => ({
//         url: `/reminder-settings`,
//         method: 'POST',
//         body: { userId, settings },
//       }),
//       invalidatesTags: ['Reminders'],
//     }),
//   }),
// });

// export const {
//   useGetUserReminderSettingsQuery,
//   useSaveUserReminderSettingsMutation,
// } = api;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReminderSelection, ReminderType } from '../../features/reminders/types/reminderType';

interface SaveReminderSettingsRequest {
  userId: string;
  settings: Record<ReminderType, ReminderSelection>;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // base הוא /api
  tagTypes: ['Reminders'],
  endpoints: (builder) => ({
    // ✅ כאן בדיוק
    getUserReminderSettings: builder.query<Record<ReminderType, ReminderSelection>, string>({
      query: (userId) => `/reminder-settings/${userId}`, // <––– כאן
      providesTags: ['Reminders'],
    }),

    saveUserReminderSettings: builder.mutation<void, SaveReminderSettingsRequest>({
      query: ({ userId, settings }) => ({
        url: `/reminder-settings`,
        method: 'POST',
        body: { userId, settings },
      }),
      invalidatesTags: ['Reminders'],
    }),
  }),
});

export const {
  useGetUserReminderSettingsQuery,
  useSaveUserReminderSettingsMutation,
} = api;
