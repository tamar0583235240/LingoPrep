import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: 'include',
    }),
    reducerPath: "api",
<<<<<<< HEAD
    tagTypes: ["Item", "Feedback", "AiInsights", "answers", "question", "shared_recordings", "admin", "users", "DynamicContents", "Answer"],
=======

    tagTypes: ["Item", "Feedback", "AiInsights", "answers", "question", "shared_recordings", "InterviewMaterials", "users", "questions", "answers", "insights", "admin", "users", "DynamicContents"],
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    endpoints: () => ({}),
});

export const { } = api;
