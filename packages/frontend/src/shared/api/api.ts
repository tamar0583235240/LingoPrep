import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: [
    "Item",
    "Feedback",
    "AiInsights",
    "answers",
    "question",
    "shared_recordings",
    "InterviewMaterials",
    "users",
    "questions",
    "answers",
    "insights",
    "admin",
    "users",
    "DynamicContents",
    "Notification",
  ],
  endpoints: () => ({}),
});

export const {} = api;
