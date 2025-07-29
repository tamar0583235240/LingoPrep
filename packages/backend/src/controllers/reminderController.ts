import { Request, Response } from "express";
import { FeedbackToSystem } from "../output/entities/FeedbackToSystem";
import { pool } from "../config/dbConnection";

// הוספת פידבק לתזכורת (הוספת תזכורת)
export const addReminder = async (req: Request, res: Response) => {
  try {
    const { id, user_id } = req.body;
    if (!id || !user_id) {
      return res.status(400).json({ error: "Missing id or user_id" });
    }
    // עדכון סטטוס לפידבק קיים
    const updateResult = await pool.query(
      `UPDATE feedback_to_system SET treatment_status = 'In treatment' WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, user_id]
    );
    let feedback;
    if (updateResult.rows.length > 0) {
      feedback = updateResult.rows[0];
    } else {
      // יצירת פידבק חדש אם לא קיים
      const insertResult = await pool.query(
        `INSERT INTO feedback_to_system (id, user_id, treatment_status) VALUES ($1, $2, 'In treatment') RETURNING *`,
        [id, user_id]
      );
      feedback = insertResult.rows[0];
    }
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: "DB error", details: err });
  }
};

// מחיקת תזכורת (הסרת תזכורת)
export const removeReminder = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.params;
    const result = await pool.query(
      `UPDATE feedback_to_system SET treatment_status = NULL WHERE id = $1 RETURNING *`,
      [feedbackId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "DB error", details: err });
  }
};

// עדכון תזכורת (עדכון סטטוס)
export const updateReminder = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.params;
    const { treatment_status } = req.body;
    const result = await pool.query(
      `UPDATE feedback_to_system SET treatment_status = $1 WHERE id = $2 RETURNING *`,
      [treatment_status, feedbackId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "DB error", details: err });
  }
};
