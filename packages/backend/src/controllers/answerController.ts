import { Request, Response } from "express";
import answerRepository from "../reposioty/answerRepository";
import { pool } from "../config/dbConnection";
import { validate as isUuid } from "uuid";

// שליפת כל התשובות לפי מזהה משתמש
export const answerController = async (req: Request, res: Response): Promise<void> => {
  console.log("answerController called");
  try {
    const items = await answerRepository.getAllAnswersByIdUser(req.params.user_id);
    res.json(items);
  } catch (error) {
    console.error("Error in answerController:", error);
    res.status(500).json({ error });
  }
};

// שליפת סטטיסטיקות התקדמות לפי מזהה משתמש
export const getProgressStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

    if (!isUuid(userId)) {
      res.status(400).json({ error: "מזהה משתמש לא תקין (UUID נדרש)" });
      return;
    }

    // בדיקה אם המשתמש קיים
    const userExistsResult = await pool.query(
      `SELECT 1 FROM users WHERE id = $1 LIMIT 1`,
      [userId]
    );
    if (userExistsResult.rowCount === 0) {
      res.status(404).json({ error: "משתמש לא נמצא" });
      return;
    }

    // סה"כ שאלות פעילות
    const totalQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM questions WHERE is_active = true`
    );
    const totalQuestions = parseInt(totalQuestionsResult.rows[0].count, 10);

    // סה"כ תשובות שהמשתמש ענה
    const answeredQuestionsResult = await pool.query(
      `SELECT COUNT(*) FROM answers WHERE user_id = $1`,
      [userId]
    );
    const answeredQuestions = parseInt(answeredQuestionsResult.rows[0].count, 10);

    const progressPercent = totalQuestions > 0
      ? (answeredQuestions / totalQuestions) * 100
      : 0;

    res.json({
      totalQuestions,
      answeredQuestions,
      progressPercent: Math.round(progressPercent),
    });

  } catch (error) {
    console.error("שגיאה בשליפת סטטיסטיקות:", error);
    res.status(500).json({ error: "אירעה שגיאה בעת שליפת סטטיסטיקות ההתקדמות" });
  }
};
