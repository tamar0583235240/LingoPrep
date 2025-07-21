import { useQuery } from '@tanstack/react-query';
import { getProgressStats } from '../services/dashboardService';
import { ProgressStats } from '../types/aiInsightsType';  // או '../types/progress' לפי מיקום הקובץ האמיתי שלך

export const useProgressStats = (userId?: string) => {
  return useQuery<ProgressStats>({
    queryKey: ['progressStats', userId],
    queryFn: () => getProgressStats(userId!),
    enabled: !!userId, // רק מריץ את השאילתה אם יש userId תקין
  });
};
