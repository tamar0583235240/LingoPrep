import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";
import { RootState } from "../store/store";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: 'include',
    }),
    reducerPath: "api",

    tagTypes: ["Item", "Feedback", "AiInsights", "answers", "question", "shared_recordings", "InterviewMaterials", "users", "questions", "answers", "insights", "admin", "users", "DynamicContents"],
    endpoints: () => ({}),
});

export const { } = api;
