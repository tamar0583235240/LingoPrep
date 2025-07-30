import { api } from '../../../shared/api/api';
import { SharedRecording } from '../types/types';
export const sharedRecordingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSharedRecordings: builder.query<SharedRecording[], { role: string; userId: string }>({
      query: ({ role, userId }) =>
        `/shared-recordings/${userId}/${role}`,
      providesTags: ['shared_recordings'],
    }),
  }),
});
export const { useGetSharedRecordingsQuery } = sharedRecordingsApi;






