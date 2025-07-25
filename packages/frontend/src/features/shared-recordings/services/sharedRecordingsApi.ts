import { api } from '../../../shared/api/api';
import { SharedRecording } from '../types/types';

export const sharedRecordingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSharedRecordings: builder.query<SharedRecording[], string>({
      query: (userId) => `/shared-recordings?userId=${userId}`,
      providesTags: ['shared_recordings'],
    }),
  }),
});

export const { useGetSharedRecordingsQuery } = sharedRecordingsApi;
