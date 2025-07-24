import { useQuery } from '@tanstack/react-query';
import { getProgressStats } from '../services/dashboardService';
import { ProgressStats } from '../types/aiInsightsType';

export const useProgressStats = (userId?: string) => {
  return useQuery<ProgressStats>({
    queryKey: ['progressStats', userId],
    queryFn: () => getProgressStats(userId!),
    enabled: !userId, // מריץ רק אם יש userId
  });
};
