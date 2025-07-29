import { useGetSharedRecordingsQuery } from '../services/sharedRecordingsApi';

export const useSharedRecordings=(userId: string, role: string)=> {
  const { data = [], isLoading } = useGetSharedRecordingsQuery({ role, userId });
  return { data, isLoading };
}
