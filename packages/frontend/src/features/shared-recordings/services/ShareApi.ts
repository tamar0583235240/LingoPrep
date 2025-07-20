import { api } from "../../../shared/api/api";
import { Participant } from "../types/Participant";

export const ShareApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSharedWith: builder.query<Participant[], { userId: string; recordingId: string }>({
      query: ({ userId, recordingId }) =>
        `shared-recordings/getSharedRecordingParticipants/${recordingId}/${userId}`,
      providesTags: ["shared_recordings"],
    }),

    addParticipant: builder.mutation<void, { recordingId: string; email: string; userId: string }>({
      query: ({ recordingId, email, userId }) => ({
        url: `shared-recordings/addParticipant`,
        method: "POST",
        body: { ownerId: userId, answerId: recordingId, email },
      }),
      invalidatesTags: ["shared_recordings"],
    }),

    getPreviouslySharedEmails: builder.query<Participant[], string>({
      query: (userId) => `shared-recordings/sharedEmails/${userId}`,
      providesTags: ["shared_recordings"],
    }),

    deleteParticipant: builder.mutation<void, { recordingId: string; email: string }>({
      query: ({ recordingId, email }) => ({
        url: `shared-recordings/deleteParticipant`,
        method: "DELETE",
        body: { recordingId, email },
      }),

      invalidatesTags: ["shared_recordings"],
    }),

}),
});

export const { useGetSharedWithQuery, useAddParticipantMutation, useGetPreviouslySharedEmailsQuery, useDeleteParticipantMutation } = ShareApi;
