import { api } from "../../../shared/api/api";

export const resourceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadRecording: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
<<<<<<< HEAD
        url: "api/resources/upload",
=======
        url: "api/upload",
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadRecordingMutation } = resourceApi;