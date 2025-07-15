import { ProgressStats } from '../types/aiInsightsType';

export const getProgressStats = async (userId: string): Promise<ProgressStats> => {
  const response = await fetch(`http://localhost:5000/api/questions/progress/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch progress stats');
  }
  const data = await response.json();
  return data;
};
