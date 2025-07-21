import { Request, Response } from 'express';
<<<<<<< HEAD
import answerRepository from '../repository/answerRepository';
=======
import  answerRepository  from '../reposioty/answerRepository';
import { pool } from "../config/dbConnection";
import { validate as isUuid } from "uuid";  
import {
  createAnswer,
  getAllAnswers,
  deleteAnswer,
  updateAnswer,
  getAnswerById,
} from '../reposioty/answerRepository';

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

export const createAnswerController = async (req: Request, res: Response) => {
  const userId = req.body.userId || req.body.user_id;
  const questionId = req.body.questionId || req.body.question_id;
  const fileUrl = req.body.fileUrl;
  const amountFeedbacks = req.body.amountFeedbacks;
  const answerFileName = req.body.answerFileName;

<<<<<<< HEAD
  // בדיקה משופרת לשדות חובה
  if (!userId || !questionId || !answerFileName) {
    console.error('❌ Missing fields:', {
      userId,
      questionId,
      answerFileName
=======
export const getProgressStats = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!isUuid(userId)) {
      return res.status(400).json({ error: "מזהה משתמש לא תקין (UUID נדרש)" });
    }

    const userExistsResult = await pool.query(
      `SELECT 1 FROM users WHERE id = $1 LIMIT 1`,
      [userId]
    );

    if (userExistsResult.rowCount === 0) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    const totalQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM questions WHERE is_active = true`
    );
    const totalQuestions = parseInt(totalQuestionsResult.rows[0].count, 10);

    const answeredQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM answers WHERE user_id = $1`,
      [userId]
    );
    const answeredQuestions = parseInt(answeredQuestionsResult.rows[0].count, 10);

    const progressPercent =
      totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

    res.json({
      totalQuestions,
      answeredQuestions,
      progressPercent: Math.round(progressPercent),
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // קבע ברירת מחדל ל-0 אם לא נשלח ערך
  const amountFeedbacksNum = amountFeedbacks === undefined ? 0 : Number(amountFeedbacks);
  if (amountFeedbacks !== undefined && isNaN(amountFeedbacksNum)) {
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
    const newAnswer = await answerRepository.createAnswer(
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
    const answers = await answerRepository.getAllAnswers();
    res.json(answers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnswerByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const answer = await answerRepository.getAnswerById(id);
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
    await answerRepository.deleteAnswer(id);
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
    const updatedAnswer = await answerRepository.updateAnswer(id, updatedFields);
    if (!updatedAnswer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.json(updatedAnswer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



export const createAnswerController = async (req: Request, res: Response) => {
  const userId = req.body.userId || req.body.user_id;
  const questionId = req.body.questionId || req.body.question_id;
  const fileUrl = req.body.fileUrl;
  const amountFeedbacks = req.body.amountFeedbacks;
  const answerFileName = req.body.answerFileName;

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

