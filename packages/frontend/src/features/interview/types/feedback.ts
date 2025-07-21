export interface FeedbackResponse {
  id: string;
  answer_id: string;
  summary: string;
  rating: number;
  strengths: string;
  improvements: string;
  flow?: string;
  confidence?: string;
}