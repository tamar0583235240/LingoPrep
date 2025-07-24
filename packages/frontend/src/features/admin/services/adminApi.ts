// import { api } from "../../../shared/api/api";
// import { user } from "../types/userTypes";

// export const adminApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query<user[], void>({
//       query: () => "users",
//       providesTags: ["users"],
//     }),
//     updateUser: builder.mutation<user, { id: string; data: Partial<user> }>({
//       query: ({ id, data }) => ({
//         url: `users/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["users"],
//     }),
//     createUser: builder.mutation<user, Partial<user>>({
//       query: (newUser) => ({
//         url: "users/add",
//         method: "POST",
//         body: newUser,
//       }),
//       invalidatesTags: ["users"],
//     }),
//     deleteUser: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `users/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["users"],
//     }),
//     uploadUsersExcel: builder.mutation<void, FormData>({
//       query: (formData) => ({
//         url: "users/upload",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["users"],
//     }),
//   }),
// });

// export const {
//   useGetUsersQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   useCreateUserMutation,
//   useUploadUsersExcelMutation,
// } = adminApi;


import { api } from "../../../shared/api/api";
import { user, UploadResponse } from "../types/userTypes";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<user[], void>({
      query: () => "users",
      providesTags: ["users"],
    }),
    updateUser: builder.mutation<user, { id: string; data: Partial<user> }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    createUser: builder.mutation<user, Partial<user>>({
      query: (newUser) => ({
        url: "users/add",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    uploadUsersExcel: builder.mutation<UploadResponse, FormData>({ // ⬅️ כאן שונה
      query: (formData) => ({
        url: "users/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUploadUsersExcelMutation,
} = adminApi;
