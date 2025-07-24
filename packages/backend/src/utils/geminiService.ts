import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "console";
import * as fs from "fs";
/**
 * פונקציית עזר ליצירת אובייקט ניתוח ברירת מחדל במקרה של שגיאה.
 * @returns אובייקט IAiAnalysis עם נתוני ברירת מחדל.
 */
function createDefaultAnalysis(): IAiAnalysis {
  return {
    rating: 1,
    confidence: "נמוכה מאוד",
    improvements: ["שגיאה בניתוח הקלטה", "נא וודא שהקובץ תקין ושה-API Key מוגדר נכון", "נסה שוב מאוחר יותר"],
    strengths: ["לא ניתן לזהות נקודות חוזק בשלב זה"],
    flow: "לא רלוונטי",
    summary: "אירעה שגיאה בניתוח ההקלטה. לא ניתן לספק משוב מפורט.",
    technicalDetails: {
      clarity: 1,
      pace: 1,
      pronunciation: 1,
    },
    keyPhrases: [],
    emotionalTone: "לא ידוע",
    duration: 0,
  };
}
/**
 * פונקציה להמרת נתיב קובץ מקומי לאובייקט GoogleGenerativeAI.Part המתאים לשליחה למודל.
 * @param path הנתיב לקובץ.
 * @param mimeType סוג ה-MIME של הקובץ (לדוגמה: 'audio/mpeg' עבור MP3).
 * @returns אובייקט Part עבור ה-API של Gemini.
 */
function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}
/**
 * מנתח קובץ אודיו באמצעות מודל Gemini AI ומחזיר ניתוח מפורט.
 * @param filePath הנתיב המלא לקובץ האודיו לניתוח.
 * @returns הבטחה (Promise) שמחזירה אובייקט IAiAnalysis.
 * @throws Error אם GEMINI_API_KEY אינו מוגדר, הקובץ לא נמצא, או אם יש שגיאה בתקשורת עם המודל.
 */
export async function analyzeAudio(filePath: string): Promise<IAiAnalysis> {
  console.log('מתחיל ניתוח אודיו...');
  console.log('קורא קובץ מנתיב:', filePath);
  try {
    // בדיקה אם ה-API Key מוגדר במשתני הסביבה
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY אינו מוגדר במשתני הסביבה. אנא הגדר אותו.');
    }
    // בדיקה אם קובץ האודיו קיים
    if (!fs.existsSync(filePath)) {
      throw new Error(`קובץ האודיו לא נמצא בנתיב: ${filePath}`);
    }
    // קריאת נתוני האודיו מהקובץ
    const audioData = fs.readFileSync(filePath);
    console.log('הקובץ נקרא בהצלחה, גודל בבתים:', audioData.length);
    // יצירת חיבור לשירות Gemini באמצעות ה-API Key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // הגדרת המודל ל-gemini-2.5-pro עם הגדרות יצירה ספציפיות
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro", // המודל המבוקש לניתוח אודיו ישיר
      generationConfig: {
        temperature: 0.9,    // הגדלת היצירתיות בתגובה
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048, // הגדלת אורך התשובה המקסימלי
      }
    });
    // הפרומפט המפורט בעברית לניתוח האודיו ופורמט ה-JSON הנדרש
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
    // קביעת סוג ה-MIME של קובץ האודיו בהתבסס על הסיומת שלו
    const mimeType = filePath.endsWith('.mp3') ? 'audio/mpeg' :
                     filePath.endsWith('.wav') ? 'audio/wav' :
                     filePath.endsWith('.ogg') ? 'audio/ogg' :
                     'application/octet-stream'; // סוג ברירת מחדל או שגיאה אם לא נתמך
    if (mimeType === 'application/octet-stream') {
      console.warn(`אזהרה: סוג קובץ אודיו לא נתמך באופן מובהק לקלט ישיר: ${filePath}. ממשיך, אך ייתכן שיכשל בניתוח מפורט.`);
    }
    // שליחת הפרומפט (טקסט) וקובץ האודיו (inlineData) למודל
    const geminiResult = await model.generateContent([
      { text: prompt },
      fileToGenerativePart(filePath, mimeType), // העברת קובץ האודיו בפורמט הנכון
    ]);
    console.log('/////////////////////////////////////////');
    console.log('תוצאה מהמודל:', geminiResult.response.candidates?.[0]?.content?.parts?.[0]?.text);

    // בדיקה וטיפול בתגובה מהמודל
    if (!geminiResult || !geminiResult.response) {
      throw new Error('לא התקבלה תגובה חוקית מ-Gemini');
    }
    const responseText = geminiResult.response.text();
    console.log('תגובת Gemini גולמית:', responseText);
    try {
      // ניקוי התגובה מסימוני Markdown (```json) לפני ניתוח ה-JSON
      const cleanedResponseText = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const analysis = JSON.parse(cleanedResponseText) as IAiAnalysis;
      console.log('ניתוח AI נותח בהצלחה.');
      return analysis;
    } catch (parseError) {
      console.error('נכשל בניתוח תגובת Gemini כ-JSON:', responseText, parseError);
      console.log('חוזר לניתוח ברירת מחדל עקב שגיאת ניתוח JSON.');
      return createDefaultAnalysis();
    }
  } catch (error) {
    console.error('שגיאה כללית בפונקציה analyzeAudio:', error);
    if (error instanceof Error) {
      throw new Error(`שגיאה בניתוח AI: ${error.message}`);
    }
    throw error; // זריקה מחדש של שגיאות לא מוכרות
  }
}





// המודל// interfaces/entities/IAiAnalysis.ts
export interface IAiAnalysis {
  rating: number; // דירוג כללי (1-5)
  confidence: string; // רמת הביטחון של הדובר (בעברית)
  improvements: string[]; // נקודות לשיפור (לפחות 3, בעברית)
  strengths: string[]; // נקודות חזקות (לפחות 3, בעברית)
  flow: string; // הערכת זרימת הדיבור (בעברית)
  summary: string; // סיכום מפורט של הניתוח (בעברית)
  technicalDetails: {
    clarity: number; // בהירות הדיבור (1-5)
    pace: number; // קצב הדיבור (1-5)
    pronunciation: number; // הגייה (1-5)
  };
  keyPhrases: string[]; // ביטויים מרכזיים שזוהו באודיו
  emotionalTone: string; // הערכת הטון הרגשי (בעברית)
  duration: number; // משך ההקלטה בשניות (ייתכן ויהיה קשה למודל להעריך במדויק מאודיו גולמי)
}