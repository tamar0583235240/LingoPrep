import { Request, Response } from 'express';
import {
  createAnswer,
  getAllAnswers,
  deleteAnswer,
  updateAnswer,
  getAnswerById,
} from '../reposioty/answerRepository';

export const createAnswerController = async (req: Request, res: Response) => {
  const userId = req.body.userId || req.body.user_id;
  const questionId = req.body.questionId || req.body.question_id;
  const fileUrl = req.body.fileUrl;
  const amountFeedbacks = req.body.amountFeedbacks;
  const answerFileName = req.body.answerFileName;

  // בדיקה משופרת לשדות חובה
  if (!userId || !questionId || !fileUrl || amountFeedbacks == null || !answerFileName) {
    console.error('❌ Missing fields:', {
      userId,
      questionId,
      fileUrl,
      amountFeedbacks,
      answerFileName
    });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // ודא שמספר הפידבקים הוא מספר
  const amountFeedbacksNum = Number(amountFeedbacks);
  if (isNaN(amountFeedbacksNum)) {
    return res.status(400).json({ error: 'amountFeedbacks must be a number' });
  }

  console.log('✅ Creating answer with:', {
    userId,
    questionId,
    fileUrl,
    amountFeedbacks: amountFeedbacksNum,
    answerFileName
  });

  try {
    const newAnswer = await createAnswer(
      userId,
      questionId,
      fileUrl,
      amountFeedbacksNum,
      answerFileName
    );
    res.json(newAnswer);
  } catch (error: any) {
    console.error('❌ Error creating answer:', error.message || error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const getAllAnswersController = async (req: Request, res: Response) => {
  try {
    const answers = await getAllAnswers();
    res.json(answers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnswerByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const answer = await getAnswerById(id);
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.json(answer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnswerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteAnswer(id);
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAnswerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fileUrl, amountFeedbacks, answerFileName } = req.body;

  // בדוק אילו שדות נמסרו ועדכן רק את השדות הללו
  const updatedFields: Partial<{ fileUrl?: string; amountFeedbacks?: number; answerFileName?: string }> = {};
  if (fileUrl) updatedFields.fileUrl = fileUrl;
  if (amountFeedbacks != null) updatedFields.amountFeedbacks = Number(amountFeedbacks);
  if (answerFileName) updatedFields.answerFileName = answerFileName;

  try {
    const updatedAnswer = await updateAnswer(id, updatedFields);
    if (!updatedAnswer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.json(updatedAnswer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
