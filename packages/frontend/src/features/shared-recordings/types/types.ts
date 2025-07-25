export interface SharedRecording {
  id: string;
  userName: string;         // שם המשתמש ששיתף
  questionTitle: string;    // כותרת השאלה
  date: string;             // תאריך ההקלטה
  audioUrl: string;         // קישור להקלטה
  aiSummary: string;        // תובנות AI
  feedbackComment?: string; // פידבק אם קיים
  feedbackRating?: number;  // דירוג אם קיים
}
