import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
        credentials: 'include',
    }),
    reducerPath: "api",

    tagTypes: ["Item","Answer", "Feedback", "AiInsights", "answers", "question", "shared_recordings", "InterviewMaterials", "users", "questions", "answers", "insights", "admin", "users", "DynamicContents"],
    endpoints: () => ({}),
});

export const { } = api;
