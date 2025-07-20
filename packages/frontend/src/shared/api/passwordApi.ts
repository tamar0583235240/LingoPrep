import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    forgotPassword: build.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: build.mutation<void, { token: string; password: string }>({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = authApi;

