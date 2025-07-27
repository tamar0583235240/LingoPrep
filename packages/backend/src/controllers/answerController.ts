import { Request, Response } from 'express';
import  answerRepository  from '../reposioty/answerRepository';
import { pool } from "../config/dbConnection";
import { validate as isUuid } from "uuid";  
import { notificationRepository } from "../reposioty/answerRepository";


export const answerController = async (req: Request, res: Response): Promise<void> => {
  console.log('answerController called');
  try {
    const items = await answerRepository.getAllAnswersByIdUser(req.params.user_id);
    res.json(items);
  } catch (error) {
    console.error('Error in answerController:', error);
    res.status(500).json({ error });
  }
};



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
    });
  } catch (error) {
    console.error("שגיאה בשליפת סטטיסטיקות:");
    res.status(500).json({ error: "אירעה שגיאה בעת שליפת סטטיסטיקות ההתקדמות" });
  }
};

export const notificationController = {
  handleCertificateNotification: async (req: Request, res: Response) => {
    console.log("handleCertificateNotification called with body:", req.body);
    try {
      const { userId, type } = req.body;
      if (!userId || !type) {
        return res.status(400).json({ message: "Missing userId or type" });
      }

      const userResult = await pool.query(
      `SELECT first_name || ' ' || last_name AS full_name FROM users WHERE id = $1`,
      [userId]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
          const studentName = userResult.rows[0].full_name;

      const message =
        type === "download"
          ? `${studentName} הוריד/ה תעודה`
          : `${studentName} הדפיס/ה תעודה`;

      const notification = await notificationRepository.insertNotification({
        user_id: userId,
        type: type === "download" ? "certificate_download" : "certificate_print",
        message,
      });

      return res.status(201).json({ success: true, notification });
    } catch (error) {
      console.error("Error in handleCertificateNotification:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  getAllCertificateNotifications: async (req: Request, res: Response) => {
    try {
      const result = await pool.query(
        `SELECT * FROM notifications WHERE type LIKE 'certificate_%' ORDER BY created_at DESC`
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching certificate notifications:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};