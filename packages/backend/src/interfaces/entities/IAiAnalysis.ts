export interface IAiAnalysis {
    rating: number;        // דירוג 1-5
    confidence: string;    // רמת ביטחון
    improvements: string[];  // נקודות לשיפור
    strengths: string[];    // נקודות חזקות
    flow: string;          // זרימת דיבור
    summary: string;       // סיכום כללי
}
