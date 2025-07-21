import { InterviewMaterial } from "../../features/knowledge-base/types/InterviewMaterials";
import { api } from "./api";

interface deleteRes {
  success: boolean;
  message: string;
}

export const interviewMaterialsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createInterviewMaterial: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/manager/interview-materials",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),

    updateInterviewMaterial: builder.mutation<void, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/manager/interview-materials/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Item", id },
        { type: "Item", id: "LIST" },
      ],
    }),

    getInterviewMaterials: builder.query<InterviewMaterial[], void>({
      query: () => ({
        url: "/manager/interview-materials",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Item" as const, id })),
              { type: "Item", id: "LIST" },
            ]
          : [{ type: "Item", id: "LIST" }],
    }),

    deleteInterviewMaterial: builder.mutation<deleteRes, string>({
      query: (id) => ({
        url: `/manager/interview-materials/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateInterviewMaterialMutation,
  useUpdateInterviewMaterialMutation,
  useDeleteInterviewMaterialMutation,
  useGetInterviewMaterialsQuery,
} = interviewMaterialsApi;
