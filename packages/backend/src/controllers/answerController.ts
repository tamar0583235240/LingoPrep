<<<<<<< HEAD
import { Request, Response } from 'express';
import  answerRepository  from '../reposioty/answerRepository';
import { pool } from "../config/dbConnection";
import { validate as isUuid } from "uuid";  

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


=======
import { Request, Response } from "express";
import pool from "../config/dbConnection"; // ודא שזה הנתיב שלך לחיבור למסד
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)

export const getProgressStats = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

<<<<<<< HEAD
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

=======
    // סופרים את כל השאלות הפעילות
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
    const totalQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM questions WHERE is_active = true`
    );
    const totalQuestions = parseInt(totalQuestionsResult.rows[0].count, 10);

<<<<<<< HEAD
=======
    // סופרים את כל התשובות של המשתמש
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
    const answeredQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM answers WHERE user_id = $1`,
      [userId]
    );
    const answeredQuestions = parseInt(answeredQuestionsResult.rows[0].count, 10);

<<<<<<< HEAD
    const progressPercent =
      totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

    res.json({
      totalQuestions,
      answeredQuestions,
      progressPercent: Math.round(progressPercent),
    });
  } catch (error) {
    console.error("שגיאה בשליפת סטטיסטיקות:");
=======
    res.json({
      totalQuestions,
      answeredQuestions,
    });

  } catch (error) {
    console.error("שגיאה בשליפת סטטיסטיקות:", error);
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
    res.status(500).json({ error: "אירעה שגיאה בעת שליפת סטטיסטיקות ההתקדמות" });
  }
};
