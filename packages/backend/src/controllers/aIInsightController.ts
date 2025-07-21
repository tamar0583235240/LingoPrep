import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import {
  createInsight,
  getAllInsights,
  deleteInsight,
  updateInsight,
  getInsightById,
} from '../reposioty/aiInsightsRepository';
import { analyzeAudio } from '../utils/geminiService';

export const createInsightController = async (req: Request, res: Response) => {
  const answerId = req.body.answerId || req.body.answer_id;
  const summary = req.body.summary;
  const rating = req.body.rating;
  const strengths = req.body.strengths;
  const improvements = req.body.improvements;
  const flow = req.body.flow;
  const confidence = req.body.confidence;

  if (!answerId || !summary || !rating) {
    console.error('❌ Missing fields:', { answerId, summary, rating });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newInsight = await createInsight(
      answerId,
      summary,
      rating,
      strengths,
      improvements,
      flow,
      confidence
    );
    res.json(newInsight);
  } catch (error: any) {
    console.error('❌ Error creating insight:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllInsightsController = async (req: Request, res: Response) => {
  try {
    const insights = await getAllInsights();
    res.json(insights);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
<<<<<<< HEAD
=======
import {
  createInsight,
  getAllInsights,
  deleteInsight,
  updateInsight,
  getInsightById,
} from '../reposioty/AiInsightsReposiory';

export const createInsightController = async (req: Request, res: Response) => {
  const answerId = req.body.answerId || req.body.answer_id;
  const summary = req.body.summary;
  const rating = req.body.rating;
  const strengths = req.body.strengths;
  const improvements = req.body.improvements;

  if (!answerId || !summary || !rating ) {
    console.error('❌ Missing fields:', { answerId, summary, rating });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // console.log('✅ Creating answer with:', { userId, questionId, fileUrl });

  try {
    const newInsight = await createInsight(answerId, summary, rating, strengths, improvements);
    res.json(newInsight);
  } catch (error: any) {
    console.error('❌ Error creating answer:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};


export const getAllInsightsController = async (req: Request, res: Response) => {
  try {
    const insights = await getAllInsights();
    res.json(insights);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

export const getInsightByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const insight = await getInsightById(id);
<<<<<<< HEAD
    if (!insight) {
      return res.status(404).json({ error: 'התובנה לא נמצאה' });
    }
=======
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    res.json(insight);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateInsightController = async (req: Request, res: Response) => {
  const { id } = req.params;
<<<<<<< HEAD
  const { answerId, summary, rating, strengths, improvements, flow, confidence } = req.body;

  const updates: any = {};
=======

  const answerId = req.body.answerId || req.body.answer_id;
  const summary = req.body.summary;
  const rating = req.body.rating;
  const strengths = req.body.strengths;
  const improvements = req.body.improvements;

  const updates: any = {};

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  if (answerId !== undefined) updates.answer_id = answerId;
  if (summary !== undefined) updates.summary = summary;
  if (rating !== undefined) updates.rating = rating;
  if (strengths !== undefined) updates.strengths = strengths;
  if (improvements !== undefined) updates.improvements = improvements;
<<<<<<< HEAD
  if (flow !== undefined) updates.flow = flow;
  if (confidence !== undefined) updates.confidence = confidence;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'לא סופקו שדות לעדכון' });
=======

  // if (fileUrl !== undefined) updates.file_url = fileUrl;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields provided to update' });
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  }

  try {
    const updated = await updateInsight(id, updates);
<<<<<<< HEAD
    if (!updated) {
      return res.status(404).json({ error: 'התובנה לא נמצאה' });
    }
=======
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    res.json(updated);
  } catch (error: any) {
    console.error('❌ Error updating insight:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};

<<<<<<< HEAD
=======

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
export const deleteInsightController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteInsight(id);
<<<<<<< HEAD
    res.json({ success: true, message: 'התובנה נמחקה בהצלחה' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const analyzeAndSaveInsight = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file uploaded' });
  }

  try {
    // שליפת קובץ האודיו ומזהה התשובה מהבקשה
    const audioFile = req.file;
    const answerId = req.body.answerId;

    if (!answerId) {
      // מחיקת הקובץ אם חסר answerId
      fs.unlinkSync(audioFile.path);
      return res.status(400).json({ error: 'Missing answerId' });
    }

    console.log('📝 Starting analysis for file:', audioFile.originalname);
    console.log('File details:', {
      path: audioFile.path,
      size: audioFile.size,
      mimetype: audioFile.mimetype
    });

    // ניתוח הקובץ באמצעות Gemini
    const analysis = await analyzeAudio(audioFile.path);
    console.log('✅ Analysis completed successfully');

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
    console.log('✅ Insight saved to database');

    // מחיקת קובץ האודיו הזמני
    fs.unlinkSync(audioFile.path);
    console.log('✅ Temporary file deleted');

    res.json(newInsight);
  } catch (error: any) {
    console.error('❌ Error analyzing audio:', error);
    
    // נסיון למחוק את הקובץ הזמני גם במקרה של שגיאה
    try {
      if (req.file?.path) {
        fs.unlinkSync(req.file.path);
        console.log('✅ Cleaned up temporary file after error');
      }
    } catch (cleanupError) {
      console.error('❌ Failed to clean up temporary file:', cleanupError);
    }

    res.status(500).json({ 
      error: error.message || 'שגיאה בניתוח הקובץ',
      details: error.stack
    });
  }
=======
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
};