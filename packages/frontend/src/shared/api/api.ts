// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        credentials: 'include',
    }),
    reducerPath: "api",
    tagTypes: ["users", "Item", "Feedback", "AiInsights", "answers", "question", "shared_recordings", "feedbackToSystem", "DynamicContents", "AI_Insights", "InterviewMaterials"
        , "questions", "insights"],
    endpoints: () => ({}),
});



