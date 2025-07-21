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
    console.log('🎯 Starting audio analysis...');
    console.log('📂 Reading file from:', filePath);
    
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not set in environment variables');
        }

        // בדיקה אם הקובץ קיים
        if (!fs.existsSync(filePath)) {
            throw new Error('Audio file not found');
        }

        const audioData = fs.readFileSync(filePath);
        console.log('✅ File read successfully, size:', audioData.length);

        // יצירת חיבור לשירות Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        });

        // מחרוזת עזר לניתוח
        const prompt = `
        נתח את התשובה המוקלטת בעברית ותן משוב מפורט.
        התייחס למרכיבים הבאים:
        1. ביטחון עצמי ושפת גוף
        2. מקצועיות ובהירות
        3. מבנה התשובה וזרימה
        4. שימוש בדוגמאות
        5. איכות ההסבר
        
        החזר את התשובה בפורמט JSON הבא:
        {
            "rating": number (1-5),
            "confidence": string (רמת הביטחון),
            "improvements": string[] (לפחות 3 נקודות לשיפור),
            "strengths": string[] (לפחות 2 נקודות חזקות),
            "flow": string (הערכה של זרימת הדיבור),
            "summary": string (סיכום כללי של התשובה)
        }

        הערה: הקפד על תשובה מפורטת ובונה שתעזור למועמד להשתפר.
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
        console.log('📝 Raw Gemini response:', responseText);

        try {
            const analysis = JSON.parse(responseText) as IAiAnalysis;
            console.log('✅ Successfully parsed AI analysis');
            return analysis;
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', responseText);
            console.log('⚠️ Falling back to default analysis');
            return createDefaultAnalysis();
        }

    } catch (error) {
        console.error('❌ Error in analyzeAudio:', error);
        if (error instanceof Error) {
            throw new Error(`שגיאה בניתוח AI: ${error.message}`);
        }
        throw error;
    }
}
