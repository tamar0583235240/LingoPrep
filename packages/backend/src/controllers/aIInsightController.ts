

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
