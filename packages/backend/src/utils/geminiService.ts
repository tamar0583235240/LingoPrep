import { GoogleGenAI } from "@Google/genai";
import * as fs from "fs";
import { IAiAnalysis } from "../interfaces/entities/IAiAnalysis"; // נתיב לממשק הניתוח
/**
 * פונקציית עזר ליצירת אובייקט ניתוח ברירת מחדל במקרה של שגיאה.
 * @returns אובייקט IAiAnalysis עם נתוני ברירת מחדל.
 */
function createDefaultAnalysis(): IAiAnalysis {
  console.log('יצירת ניתוח ברירת מחדל עקב שגיאה.');
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
  console.log(`ממיר קובץ ל-Generative Part: ${path}, MIME: ${mimeType}`);
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
      console.error('שגיאה: GEMINI_API_KEY אינו מוגדר במשתני הסביבה.');
      throw new Error('GEMINI_API_KEY אינו מוגדר במשתני הסביבה. אנא הגדר אותו.');
    }
    console.log('GEMINI_API_KEY מוגדר בהצלחה.');
    // בדיקה אם קובץ האודיו קיים
    if (!fs.existsSync(filePath)) {
      console.error(`שגיאה: קובץ האודיו לא נמצא בנתיב: ${filePath}`);
      throw new Error(`קובץ האודיו לא נמצא בנתיב: ${filePath}`);
    }
    console.log('קובץ האודיו נמצא.');
    // קריאת נתוני האודיו מהקובץ
    const audioData = fs.readFileSync(filePath);
    console.log('הקובץ נקרא בהצלחה, גודל בבתים:', audioData.length);
    // יצירת חיבור לשירות Gemini באמצעות ה-API Key
    const ai = new GoogleGenAI({}); // ייקח את GEMINI_API_KEY אוטומטית
    console.log('אובייקט GoogleGenAI נוצר.');
    // הגדרת המודל ל-gemini-2.5-pro עם הגדרות יצירה ספציפיות
    const modelName = "gemini-2.5-pro";
    const config = {
      model: modelName,
      config: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
        responseMimeType: "application/json"
      }
    };
    console.log('מודל Gemini הוגדר: gemini-2.5-pro עם responseMimeType: application/json.');
    // הפרומפט המפורט בעברית לניתוח האודיו ופורמט ה-JSON הנדרש
    // הפרומפט עדיין חשוב כדי להנחות את המודל לגבי מבנה ה-JSON הספציפי.
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
    console.log('פרומפט הניתוח מוכן.');
    // קביעת סוג ה-MIME של קובץ האודיו בהתבסס על הסיומת שלו
    const mimeType = filePath.endsWith('.mp3') ? 'audio/mpeg' :
      filePath.endsWith('.wav') ? 'audio/wav' :
        filePath.endsWith('.ogg') ? 'audio/ogg' :
          filePath.endsWith('.webm') ? 'audio/webm' :
            'application/octet-stream';
    if (mimeType === 'application/octet-stream') {
      console.warn(`אזהרה: סוג קובץ אודיו לא נתמך באופן מובהק לקלט ישיר: ${filePath}. ממשיך, אך ייתכן שיכשל בניתוח מפורט.`);
    }
    console.log(`סוג MIME שזוהה עבור הקובץ: ${mimeType}`);
    // שליחת הפרומפט (טקסט) וקובץ האודיו (inlineData) למודל
    console.log('שולח בקשה למודל Gemini...');
    const response = await ai.models.generateContent({
      ...config,
      contents: [
        { role: "user", parts: [ { text: prompt }, fileToGenerativePart(filePath, mimeType) ] }
      ]
    });
    console.log('התקבלה תגובה ראשונית מ-Gemini.');
    // שליפת הטקסט מהתגובה לפי המבנה החדש של @Google Drive/genai
    let responseText = "";
    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (typeof part === "string") {
      responseText = part;
    } else if (part && typeof part === "object" && "text" in part && typeof part.text === "string") {
      responseText = part.text;
    }
    console.log('תגובת Gemini גולמית (ייתכן שקצוצה):', responseText.substring(0, 500) + (responseText.length > 500 ? '...' : ''));
    try {
      // כאשר responseMimeType מוגדר, התגובה אמורה להיות JSON טהור, ללא סימוני Markdown.
      // לכן, הסרנו את שלב הניקוי של סימוני ה-Markdown.
      console.log('מנסה לנתח את התגובה כ-JSON...');
      const analysis = JSON.parse(responseText) as IAiAnalysis; // מנתחים ישירות את התגובה
      console.log('ניתוח AI נותח בהצלחה.');
      return analysis;
    } catch (parseError) {
      console.error('שגיאה: נכשל בניתוח תגובת Gemini כ-JSON.', parseError);
      console.error('התגובה המלאה שגרמה לשגיאת ניתוח:', responseText);
      console.log('חוזר לניתוח ברירת מחדל עקב שגיאת ניתוח JSON.');
      return createDefaultAnalysis();
    }
  } catch (error) {
    console.error('שגיאה כללית בפונקציה analyzeAudio:', error);
    if (error instanceof Error) {
      console.error(`פרטי שגיאה: ${error.message}`);
      throw new Error(`שגיאה בניתוח AI: ${error.message}`);
    }
    throw error;
  }
}















