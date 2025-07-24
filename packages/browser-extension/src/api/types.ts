export interface LoginRequest {
  email: string;
  password: string;
}
export type ProgressData = {
  totalQuestions: number;
  answeredQuestions: number;
  progressPercent: number;
};

export interface ProgressStatsProps {
  pd: ProgressData | null;
}