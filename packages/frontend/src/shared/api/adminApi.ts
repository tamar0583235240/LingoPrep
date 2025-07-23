import { api } from "./api";
import { UploadResponse, user } from "../../features/admin/types/userType";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<user[], void>({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    addUser: build.mutation<user, Partial<user>>({
      query: (newUser) => ({
        url: "/admin/add",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: build.mutation<user, { id: string; data: Partial<user> }>({
      query: ({ id, data }) => ({
        url: `/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    uploadUsersExcel: build.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "/admin/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
  overrideExisting: false,
});

export const {
    useAddUserMutation: useCreateUserMutationAdmin,  // כאן שמור נכון את השם

  useGetUsersQuery: useGetUsersQueryAdmin,
  useAddUserMutation: useAddUserMutationAdmin,
  useUpdateUserMutation: useUpdateUserMutationAdmin,
  useDeleteUserMutation: useDeleteUserMutationAdmin,
  useUploadUsersExcelMutation: useUploadUsersExcelMutationAdmin,
} = adminApi;
