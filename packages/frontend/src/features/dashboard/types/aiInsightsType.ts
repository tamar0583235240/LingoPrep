export interface AIInsight {
  id: string;
  answer_id: string;
  summary: string;
  rating: number;
  strengths: string;
  improvements: string;
}

export type aiInsightsType = AIInsight;

export interface ProgressStats {
  totalQuestions: number;
  answeredQuestions: number;
}
