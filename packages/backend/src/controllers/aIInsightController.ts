import { Request, Response } from 'express';
import { AiInsights } from '../interfaces/entities/AiInsights';
import AiInsightsReposiory from '../reposioty/AiInsightsReposiory';
import aiInsigthRepository from '../reposioty/aiInsigthRepository';

export const getAiInsightsByAnswerId = async (req: Request, res: Response): Promise<AiInsights | void> => {
    try {
        const answerId = req.params.answerId;
        const AiInsights = await AiInsightsReposiory.getAiInsightsByAnswerId(answerId);
        res.json(AiInsights);
        
    } catch (error) {
        console.error('Error in getAiInsightsByAnswerId:', error);
        res.status(500).json({ error });
    }
};


export const getAiInsights = async (req: Request, res: Response): Promise<void> => {
    try {
        const AiInsights = await AiInsightsReposiory.getAiInsights();  
        res.status(200).json(AiInsights);
    } catch (error) {
        console.error('Error in getAiInsights controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAiInsigths = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await aiInsigthRepository.getAiInsights();
        res.json(items);
    } catch (error) {
        console.error('Error in ai insigth controller:', error);
        res.status(500).json({ error });
    }
};