import { api } from "../../../shared/api/api";

export const resourceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadRecording: builder.mutation<{
      id(id: any): unknown; url: string 
}, FormData>({
      query: (formData) => ({
        url: "api/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadRecordingMutation } = resourceApi;