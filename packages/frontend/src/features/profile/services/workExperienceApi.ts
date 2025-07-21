import { api } from "../../../shared/api/api"; 

export const workExperienceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkExperiences: builder.query({
      query: (user_id: string) => `/work-experience?user_id=${user_id}`,
    }),
    createWorkExperience: builder.mutation({
      query: (data) => ({
        url: "/work-experience",
        method: "POST",
        body: data,
      }),
    }),
    updateWorkExperience: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/work-experience/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteWorkExperience: builder.mutation({
      query: (id: string) => ({
        url: `/work-experience/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWorkExperiencesQuery,
  useCreateWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
} = workExperienceApi;