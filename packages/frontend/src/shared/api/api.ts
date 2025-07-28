// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001",
        credentials: 'include',
    }),
    tagTypes: ["Item", "Feedback", "AiInsights", "answers", "question", "shared_recordings", "interviewExperiences", "experienceThanks", "contentReports"],

    endpoints: () => ({}),
});



