import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import {
  createInsight,
  getAllInsights,
  deleteInsight,
  updateInsight,
  getInsightById,
} from '../repository/AiInsightsReposiory';
import { analyzeAudio } from '../utils/geminiService';
export const createInsightController = async (req: Request, res: Response) => {
  console.log('--- [AI] createInsightController called ---');
  const answerId = req.body.answerId || req.body.answer_id;
  const audioPath = req.body.audioPath || req.body.audio_path; // אפשר לקבל נתיב קובץ או לשלוח קובץ
  if (!answerId || !audioPath) {
    console.error(':x: Missing fields:', { answerId, audioPath });
    return res.status(400).json({ error: 'Missing required fields (answerId, audioPath)' });
  }
  try {
    // ניתוח אוטומטי עם AI
    const analysis = await analyzeAudio(audioPath);
    console.log('[AI] Analysis from Gemini:', analysis);
    // שמירה במסד
    const newInsight = await createInsight(
      answerId,
      analysis.summary,
      analysis.rating.toString(),
      analysis.strengths.join(', '),
      analysis.improvements.join(', '),
      analysis.flow,
      analysis.confidence
    );
    console.log('[AI] Insight created successfully:', newInsight);
    res.json(newInsight);
  } catch (error: any) {
    console.error(':x: Error creating insight:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};
export const getAllInsightsController = async (req: Request, res: Response) => {
  console.log('--- [AI] getAllInsightsController called ---');
  try {
    const insights = await getAllInsights();
    console.log('[AI] All insights:', insights.length);
    res.json(insights);
  } catch (error: any) {
    console.error(':x: Error getting all insights:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};
export const getInsightByIdController = async (req: Request, res: Response) => {
  console.log("tami");
  
  const { id } = req.params;
  console.log(id);
  
  console.log('--- [AI] getInsightByIdController called ---', id);
  try {
    const insight = await getInsightById(id);
    if (!insight) {
      console.warn('[AI] Insight not found for answerId:', id);
      return res.status(404).json({ error: 'התובנה לא נמצאה' });
    }
    console.log('[AI] Insight found:', insight);
    res.json(insight);
  } catch (error: any) {
    console.error(':x: Error getting insight by id:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};
export const updateInsightController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { answerId, summary, rating, strengths, improvements, flow, confidence } = req.body;
  const updates: any = {};
  if (answerId !== undefined) updates.answer_id = answerId;
  if (summary !== undefined) updates.summary = summary;
  if (rating !== undefined) updates.rating = rating;
  if (strengths !== undefined) updates.strengths = strengths;
  if (improvements !== undefined) updates.improvements = improvements;
  if (flow !== undefined) updates.flow = flow;
  if (confidence !== undefined) updates.confidence = confidence;
  console.log('--- [AI] updateInsightController called ---', { id, updates });
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'לא סופקו שדות לעדכון' });
  }
  try {
    const updated = await updateInsight(id, updates);
    if (!updated) {
      console.warn('[AI] Insight to update not found:', id);
      return res.status(404).json({ error: 'התובנה לא נמצאה' });
    }
    console.log('[AI] Insight updated:', updated);
    res.json(updated);
  } catch (error: any) {
    console.error(':x: Error updating insight:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};
export const analyzeRecordingController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      console.warn('[AI] No file sent for analysis');
      return res.status(400).json({ error: 'לא נשלח קובץ הקלטה' });
    }
    const filePath = req.file.path;
    console.log(':open_file_folder: Analyzing recording from:', filePath);
    // ניתוח האודיו באמצעות Gemini
    const analysis = await analyzeAudio(filePath);
    console.log('[AI] Analysis result:', analysis);
    // מחיקת הקובץ הזמני אם קיים
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('[AI] Temporary file deleted:', filePath);
    }
    res.json({
      success: true,
      analysis
    });
  } catch (error: any) {
    console.error(':x: Error analyzing recording:', error);
    res.status(500).json({
      error: 'שגיאה בניתוח ההקלטה',
      details: error.message
    });
  }
};
export const deleteInsightController = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('--- [AI] deleteInsightController called ---', id);
  try {
    await deleteInsight(id);
    console.log('[AI] Insight deleted:', id);
    res.json({ success: true, message: 'התובנה נמחקה בהצלחה' });
  } catch (error: any) {
    console.error(':x: Error deleting insight:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};
export const analyzeAndSaveInsight = async (req: Request, res: Response) => {
  console.log('--- [AI] analyzeAndSaveInsight called ---');
  if (!req.file) {
    console.warn('[AI] No audio file uploaded');
    return res.status(400).json({ error: 'No audio file uploaded' });
  }
  try {
    // שליפת קובץ האודיו ומזהה התשובה מהבקשה
    const audioFile = req.file;
    const answerId = req.body.answerId;
    console.log('--- [AI] analyzeAndSaveInsight called ---', { answerId, audioFile });
    if (!answerId) {
      // מחיקת הקובץ אם חסר answerId
      fs.unlinkSync(audioFile.path);
      console.warn('[AI] Missing answerId, file deleted');
      return res.status(400).json({ error: 'Missing answerId' });
    }
    console.log(':memo: Starting analysis for file:', audioFile.originalname);
    console.log('File details:', {
      path: audioFile.path,
      size: audioFile.size,
      mimetype: audioFile.mimetype
    });
    // ניתוח הקובץ באמצעות Gemini
    const analysis = await analyzeAudio(audioFile.path);
    console.log('[AI] Analysis result:', analysis);
    console.log('[AI][DEBUG] About to call createInsight with:', {
      answerId,
      summary: analysis.summary,
      rating: analysis.rating,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      flow: analysis.flow,
      confidence: analysis.confidence
    });
    // שמירת התובנות במסד הנתונים
    const newInsight = await createInsight(
      answerId,
      analysis.summary,
      analysis.rating.toString(),
      Array.isArray(analysis.strengths) ? analysis.strengths.join('\n') : analysis.strengths,
      Array.isArray(analysis.improvements) ? analysis.improvements.join('\n') : analysis.improvements,
      analysis.flow,
      analysis.confidence
    );
    console.log('[AI][Insight DB Result]', newInsight);
    // מחיקת קובץ האודיו הזמני
    fs.unlinkSync(audioFile.path);
    console.log('[AI] Temporary file deleted:', audioFile.path);
    res.json(newInsight);
  } catch (error: any) {
    console.error(':x: Error analyzing audio:', error);
    // נסיון למחוק את הקובץ הזמני גם במקרה של שגיאה
    try {
      if (req.file?.path) {
        fs.unlinkSync(req.file.path);
        console.log('[AI] Cleaned up temporary file after error');
      }
    } catch (cleanupError) {
      console.error(':x: Failed to clean up temporary file:', cleanupError);
    }
    res.status(500).json({
      error: error.message || 'שגיאה בניתוח הקובץ',
      details: error.stack
    });
  }
};




















