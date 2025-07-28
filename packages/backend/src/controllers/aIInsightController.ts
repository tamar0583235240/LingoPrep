

import { Request, Response } from 'express';
import aiInsightsRepository from '../reposioty/AiInsightsReposiory';

export const getAiInsights = async (req: Request, res: Response): Promise<void> => {
  try {
    const insights = await aiInsightsRepository.getAiInsights();
    res.status(200).json(insights);
  } catch (error) {
    console.error('❌ Error in getAiInsights controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAiInsightsByAnswerId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { answerId } = req.params;
    const insights = await aiInsightsRepository.getAiInsightsByAnswerId(answerId);
    res.status(200).json(insights);
  } catch (error) {
    console.error(`❌ Error in getAiInsightsByAnswerId controller for answerId ${req.params.answerId}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
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


export const getInsightByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const insight = await getInsightById(id);
    res.json(insight);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateInsightController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const answerId = req.body.answerId || req.body.answer_id;
  const summary = req.body.summary;
  const rating = req.body.rating;
  const strengths = req.body.strengths;
  const improvements = req.body.improvements;

  const updates: any = {};

  if (answerId !== undefined) updates.answer_id = answerId;
  if (summary !== undefined) updates.summary = summary;
  if (rating !== undefined) updates.rating = rating;
  if (strengths !== undefined) updates.strengths = strengths;
  if (improvements !== undefined) updates.improvements = improvements;

  // if (fileUrl !== undefined) updates.file_url = fileUrl;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields provided to update' });
  }

  try {
    const updated = await updateInsight(id, updates);
    res.json(updated);
  } catch (error: any) {
    console.error('❌ Error updating insight:', error.message || error);
    res.status(500).json({ error: error.message });
  }
};


export const deleteInsightController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteInsight(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};