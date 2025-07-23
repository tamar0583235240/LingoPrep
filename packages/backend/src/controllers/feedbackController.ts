import { Request, Response } from 'express';
import { Feedback } from '../interfaces/entities/Feedback';
import { createFeedbackWithNotificationRepo, getFeedbackesByanswerIdRepo } from '../reposioty/feedBackRepository';
import { getAllFeedbacksByUserId as getFeedbacksFromRepo } from '../reposioty/feedBackRepository';

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

export const getAllFeedbacksByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const feedbacks = await getFeedbacksFromRepo(userId);
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Failed to fetch feedbacks." });
  }
};

export const createFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { comment, rating, answerCodeId, givenByUserId, sharedRecordingId } = req.body;

    const result = await createFeedbackWithNotificationRepo({
      comment,
      rating,
      answerCodeId,
      givenByUserId,
      sharedRecordingId,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createFeedback:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
