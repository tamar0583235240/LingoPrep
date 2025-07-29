import { Request, Response } from 'express';

import * as codeQuestionsRepository from "../repository/codeQuestionsRepository";
import nodemailer from 'nodemailer';


// שליפת כל הנושאים
export const getAllTopics = async (req: Request, res: Response): Promise<void> => {
  try {
    const topics = await codeQuestionsRepository.getAllTopicsFromDB();
    res.status(200).json(topics);
  } catch (err) {
    console.error("Error fetching topics", err);
    res.status(500).json({ message: "שגיאה בקבלת נושאים" });
  }
};

// שליפת כל השאלות
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const { topic, level, type } = req.query;

    const questions = await codeQuestionsRepository.getAllQuestionsFromDB(
      topic as string | undefined,
      level as string | undefined,
      type as string | undefined
    );

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// עדכון סטטוס שאלה
export const updateQuestionStatus = async (req: Request, res: Response) => {
  const { userId, questionId, status } = req.body;

  if (!userId || !questionId || !status) {
    return res.status(400).json({ message: "Missing userId, questionId or status" });
  }

  try {
    const updated = await codeQuestionsRepository.updateQuestionStatus(userId, questionId, status);
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating question status", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DB שמירת/עדכון התשובה של המשתמש ב 
export const saveUserAnswer = async (req: Request, res: Response) => {
  const { userId, questionId, answer, codeLanguage } = req.body;

  if (!userId || !questionId || !answer) {
    return res.status(400).json({ message: "Missing userId, questionId or answer" });
  }

  try {
    const saved = await codeQuestionsRepository.saveUserAnswer(userId, questionId, answer, codeLanguage);
    res.json({ success: true, data: saved });
  } catch (error) {
    console.error("Error saving user answer", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// שליפת הסטטוס של כל השאלות לפי משתמש
export const getUserQuestionStatuses = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const statuses = await codeQuestionsRepository.getStatusesByUserId(userId);
    res.json({ success: true, data: statuses });
  } catch (error) {
    console.error("Error fetching statuses", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// שליפת התשובה של המשתמש
export const getUserAnswerByQuestion = async (req: Request, res: Response) => {
  try {
    const { userId, questionId } = req.params;

    if (!userId || !questionId) {
      return res.status(400).json({ message: "Missing userId or questionId" });
    }

    const answer = await codeQuestionsRepository.getUserAnswer(userId, questionId);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    return res.json(answer);
  } catch (error) {
    console.error('Error getting user answer:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// מחיקת תשובה של המשתמש לפי מזהה שאלה
export const deleteUserAnswerByQuestion = async (req: Request, res: Response) => {
  try {
    const { userId, questionId } = req.params;

    if (!userId || !questionId) {
      return res.status(400).json({ message: "Missing userId or questionId" });
    }

    const deleted = await codeQuestionsRepository.deleteUserAnswer(userId, questionId);

    if (!deleted) {
      return res.status(404).json({ message: "Answer not found" });
    }

    return res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.error("Error deleting user answer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// הוספת לייק או דיסלייק
export const setQuestionLike = async (req: Request, res: Response) => {
  const { userId, questionId, liked } = req.body;

  if (!userId || !questionId || liked === undefined) {
    return res.status(400).json({ message: "Missing userId, questionId or liked" });
  }

  try {
    const likeRecord = await codeQuestionsRepository.upsertQuestionLike(userId, questionId, liked);
    res.status(200).json({ success: true, like: likeRecord });
  } catch (error) {
    console.error("Error setting like/dislike:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// שליפת לייקים ודיסלייקים לשאלה
export const getQuestionLikes = async (req: Request, res: Response) => {
  const { questionId } = req.params;

  if (!questionId) {
    return res.status(400).json({ message: "Missing questionId" });
  }

  try {
    const counts = await codeQuestionsRepository.getLikesDislikesByQuestion(questionId);
    res.status(200).json(counts);
  } catch (error) {
    console.error("Error getting likes/dislikes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// שליפת כל הלייקים לכל השאלות
export const getAllLikes = async (req: Request, res: Response) => {
  try {
    const likes = await codeQuestionsRepository.getAllLikes();
    res.status(200).json(likes);
  } catch (error) {
    console.error("Error getting all likes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// שליחת מייל
export const sendEmail = async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res
      .status(400)
      .json({ message: "Missing to, subject or text in request body" });
  }
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px;">
        <p style="background-color: #F9F9F9; padding: 10px; border-radius: 6px; line-height: 1.6;">
          ${text.replace(/\n/g, "<br>")}
        </p>
      </div>
    `;
    await transporter.sendMail({
      from: `"LingoPrep" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};
