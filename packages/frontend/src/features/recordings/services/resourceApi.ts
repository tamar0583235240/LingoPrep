import { api } from "../../../shared/api/api";

export const resourceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadRecording: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: "api/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadRecordingMutation } = resourceApi;