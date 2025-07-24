import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import { IAiAnalysis } from "../interfaces/entities/IAiAnalysis";
// יצירת מודל ברירת מחדל לתשובה
function createDefaultAnalysis(): IAiAnalysis {
    return {
        rating: 4,
        confidence: "טובה",
        improvements: [
            "להוסיף דוגמאות מעשיות",
            "לשפר את הביטחון העצמי",
            "לעבוד על זרימת הדיבור"
        ],
        strengths: [
            "תוכן מקצועי טוב",
            "מבנה תשובה ברור"
        ],
        flow: "סביר",
        summary: "תשובה טובה עם פוטנציאל לשיפור"
    };
}
export async function analyzeAudio(filePath: string): Promise<IAiAnalysis> {
    console.log(':dart: Starting audio analysis...');
    console.log(':open_file_folder: Reading file from:', filePath);
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not set in environment variables');
        }
        // בדיקה אם הקובץ קיים
        if (!fs.existsSync(filePath)) {
            throw new Error('Audio file not found');
        }
        const audioData = fs.readFileSync(filePath);
        console.log(':white_check_mark: File read successfully, size:', audioData.length);
        // יצירת חיבור לשירות Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-pro-vision",  // שימוש במודל החדש שתומך גם בניתוח אודיו
            generationConfig: {
                temperature: 0.9,        // הגדלת היצירתיות
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,   // הגדלת אורך התשובה
            }
        });
        // מחרוזת עזר לניתוח
        const prompt = `
        אנא נתח את התשובה המוקלטת בעברית ותן משוב מקיף ומפורט.
        דגשים לניתוח:
        1. איכות מקצועית:
           - דיוק ונכונות המידע
           - שימוש בטרמינולוגיה מקצועית
           - עומק ההסבר
        2. מיומנויות תקשורת:
           - ביטחון עצמי וטון דיבור
           - בהירות ההסבר
           - קצב דיבור
           - שטף ורהיטות
        3. מבנה ותוכן:
           - מבנה לוגי של התשובה
           - שימוש בדוגמאות מעשיות
           - קישור בין רעיונות
           - סיכום וסגירה
        4. היבטים רגשיים:
           - התלהבות ועניין בנושא
           - יכולת להעביר מסר משכנע
           - התמודדות עם לחץ
        נא להחזיר את התשובה בפורמט JSON הבא:
        {
            "rating": number (1-5),
            "confidence": string (רמת הביטחון בעברית),
            "improvements": string[] (לפחות 3 נקודות לשיפור, בעברית),
            "strengths": string[] (לפחות 3 נקודות חזקות, בעברית),
            "flow": string (הערכת זרימת הדיבור, בעברית),
            "summary": string (סיכום מפורט בעברית),
            "technicalDetails": {
                "clarity": number (1-5),
                "pace": number (1-5),
                "pronunciation": number (1-5)
            },
            "keyPhrases": string[] (ביטויים מרכזיים שזוהו),
            "emotionalTone": string (הערכת הטון הרגשי בעברית),
            "duration": number (משך ההקלטה בשניות)
        }
        חשוב:
        - התשובה חייבת להיות בפורמט JSON תקין
        - כל הטקסט חייב להיות בעברית
        - יש לתת משוב בונה ומפורט שיעזור למועמד להשתפר
        - יש להתייחס גם לנקודות חיוביות וגם לנקודות לשיפור
        `;
        // המרת האודיו לטקסט (base64) ושליחה לניתוח
        const audioBase64 = audioData.toString('base64');
        const geminiResult = await model.generateContent([
            { text: prompt },
            { text: `Audio content (base64): ${audioBase64}` }
        ]);
        if (!geminiResult || !geminiResult.response) {
            throw new Error('No response received from Gemini');
        }
        const responseText = geminiResult.response.text();
        console.log(':memo: Raw Gemini response:', responseText);
        try {
            const analysis = JSON.parse(responseText) as IAiAnalysis;
            console.log(':white_check_mark: Successfully parsed AI analysis');
            return analysis;
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', responseText);
            console.log(':warning: Falling back to default analysis');
            return createDefaultAnalysis();
        }
    } catch (error) {
        console.error(':x: Error in analyzeAudio:', error);
        if (error instanceof Error) {
            throw new Error(`שגיאה בניתוח AI: ${error.message}`);
        }
        throw error;
    }
}