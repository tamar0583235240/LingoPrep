import { Request, Response } from 'express';
import statusRepository from '../reposioty/statusRepository';

export const getUserAnsweredQuestionsControler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const category = req.query.category as string;

    if (!userId || !category) {
      return res.status(400).json({ message: 'Missing userId or category' });
    }

    const questions = await statusRepository.getUserAnsweredQuestions(userId, category);

    return res.status(200).json(questions);
  } catch (error) {
    console.error('❌ Controller error:', error);
    return res.status(500).json({ message: 'Server error fetching answered questions' });
  }
};
