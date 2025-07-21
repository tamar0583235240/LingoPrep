// הגדרת הממשק של תובנה אחת מה-AI
export interface AIInsight {
  id: string;
  answer_id: string;
  summary: string;
  rating: number;
  strengths: string;
  improvements: string;
}

// טיפוס אחד בודד של תובנה – פשוטה
export type aiInsightsType = AIInsight;

// ממשק לסטטיסטיקות של התקדמות המשתמש
export interface ProgressStats {
  totalQuestions: number;
  answeredQuestions: number;
}
