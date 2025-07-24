import { api } from "./api";
import { User } from "../../features/auth/types/types";
import { logout } from "../../features/auth/store/authSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: User },
      { email: string; password: string; rememberMe?: boolean }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    signup: builder.mutation<LoginResponse, SignupRequest>({
      query: (newUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: newUser,
        credentials: "include",
      }),
    }),
    refreshToken: builder.mutation<{ token: string; user: User }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        credentials: "include", // חשוב כדי לשלוח cookie
      }),
    }),
    logout: builder.mutation<void, User>({
      query: (user) => ({
        url: "/auth/logout",
        method: "POST",
        body: { user },
        credentials: "include", // חשוב כדי לשלוח cookie
      }),
    }),
    signupRequest: builder.mutation<
      { message: string },
      Omit<SignupRequest, "phone"> & { phone?: string }
    >({
      query: (user) => ({
        url: "/auth/signup/request",
        method: "POST",
        body: user,
      }),
    }),
    signupConfirm: builder.mutation<
      LoginResponse,
      { email: string; code: string }
    >({
      query: (data) => ({
        url: "/auth/signup/confirm",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useSignupRequestMutation,
  useSignupConfirmMutation,
} = authApi;
