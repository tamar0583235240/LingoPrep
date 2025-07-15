import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: 'include',
    }),
    reducerPath: "api",

    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question","shared_recordings","admin","users","DynamicContents"],
    endpoints: () => ({}),
});





