import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReminderSelection, ReminderType } from '../../features/reminders/types/reminderType';

interface SaveReminderSettingsRequest {
  userId: string;
  settings: Record<ReminderType, ReminderSelection>;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // base הוא /api
  tagTypes: ['Reminders', 'Item', 'question', 'DynamicContents', 'users', 'shared_recordings', 'answers', 'AiInsights', 'Feedback'],
  endpoints: (builder) => ({
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
