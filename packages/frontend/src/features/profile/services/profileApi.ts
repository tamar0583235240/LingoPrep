import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Profile } from "../types/profileTypes";
export const profilesApi = createApi({
  reducerPath: "profilesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getProfiles: build.query<Profile[], void>({
      query: () => "profiles",
    }),
    getProfileById: build.query<Profile, string>({
      query: (id) => `profiles/user/${id}`,
    }),
    updateProfile: build.mutation<Profile, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `profiles/user/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});
export const {
  useGetProfilesQuery,
  useGetProfileByIdQuery,
  useUpdateProfileMutation,
} = profilesApi;