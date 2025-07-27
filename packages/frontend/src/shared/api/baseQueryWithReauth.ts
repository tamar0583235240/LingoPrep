// features/auth/baseQueryWithReauth.ts
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { baseQuery } from "./baseQuery";
import { setToken, logout } from "../../features/auth/store/authSlice";

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

    if (refreshResult.data && typeof refreshResult.data === "object" && "token" in refreshResult.data) {
      api.dispatch(setToken((refreshResult.data as any).accessToken));
      result = await baseQuery(args, api, extraOptions); // ניסיון מחדש
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
