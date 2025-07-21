import { api } from "../../../shared/api/api";
import { UploadResponse, user } from "../types/userType";
// import { user, UploadResponse } from "../types/userTypes";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // שליפת כל המשתמשים
    getUsers: builder.query<user[], void>({
      query: () => "users",
      providesTags: ["users"],
    }),

    // עדכון משתמש
    updateUser: builder.mutation<user, { id: string; data: Partial<user> }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    // יצירת משתמש
    createUser: builder.mutation<user, Partial<user>>({
      query: (newUser) => ({
        url: "users/add",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["users"],
    }),

    // מחיקת משתמש
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    // העלאת אקסל
    uploadUsersExcel: builder.mutation<UploadResponse, FormData>({
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
  useCreateUserMutation,
  useDeleteUserMutation,
  useUploadUsersExcelMutation,
} = adminApi;
