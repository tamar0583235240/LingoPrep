export interface IAiAnalysis {
    rating: number;           // דירוג 1-5
    confidence: string;       // רמת ביטחון
    improvements: string[];   // נקודות לשיפור
    strengths: string[];      // נקודות חזקות
    flow: string;            // זרימת דיבור
    summary: string;         // סיכום כללי
    technicalDetails?: {     // פרטים טכניים נוספים
        clarity: number;     // בהירות הדיבור 1-5
        pace: number;        // קצב הדיבור 1-5
        pronunciation: number; // הגייה 1-5
    };
    keyPhrases?: string[];   // ביטויים מרכזיים שזוהו
    emotionalTone?: string;  // טון רגשי
    duration?: number;       // משך ההקלטה בשניות
}