import { Request, Response } from 'express';
import { Feedback } from '../interfaces/entities/Feedback';
import { getFeedbackesByanswerIdRepo } from '../repository/feedBackRepository';

export const getFeedbackesByanswerId = async (req: Request, res: Response): Promise<void> => {
    try {
        const sharedRecordingId = req.params.sharedRecordingId;
        const feedbackes = await getFeedbackesByanswerIdRepo(sharedRecordingId);
        res.json(feedbackes);
    } catch (error) {
        console.error('Error in getFeedbackesBysharedRecordingId:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
