import { useGetSharedRecordingsQuery } from '../services/sharedRecordingsApi';

export function useSharedRecordings(userId: string) {
  const { data = [], isLoading } = useGetSharedRecordingsQuery(userId);
  return { data, isLoading };
}
