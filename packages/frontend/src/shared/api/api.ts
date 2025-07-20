import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: 'include',
    }),
    reducerPath: "api",
<<<<<<< HEAD
    tagTypes: ["Item", "Answer"],
=======
    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question","shared_recordings", "InterviewMaterials","users", "questions", "answers", "insights","admin","users","DynamicContents"],
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
    endpoints: () => ({}),
  });

export const { } = api;
