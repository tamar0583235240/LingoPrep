import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState, store } from "../store/store";
// import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { logout, setToken } from "../../features/auth/store/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST", credentials: "include" },
      api,
      extraOptions
    );

    if (
      refreshResult.data &&
      typeof refreshResult.data === "object" &&
      "token" in refreshResult.data
    ) {
      const { setToken } = await import("../../features/auth/store/authSlice");
      store.dispatch(setToken((refreshResult.data as any).token));
      result = await baseQuery(args, api, extraOptions);
    } else {
      const { logout } = await import("../../features/auth/store/authSlice");
      store.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
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
  ],
  endpoints: () => ({}),
});

export const {} = api;
