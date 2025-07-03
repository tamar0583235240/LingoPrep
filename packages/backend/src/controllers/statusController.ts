import { Request, Response } from 'express';
import statusRepository from '../reposioty/statusRepository';
import { pool } from '../reposioty/answerRepository';
export const getStatusByUserId = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
console.log(":inbox_tray: userId from params:", userId);
  try {
    const answered = await statusRepository.getStatusByUserId(userId);
    console.log(":white_check_mark: answered result:", answered);
   if (answered) {
      // אם answered הוא מערך
      if (Array.isArray(answered)) {
        console.log(':white_check_mark: Questions fetched successfully:', answered.length);
      } else {
        // אם answered הוא אובייקט עם שדה answered (כמו {answered: [...]})
        if (Array.isArray(answered.answered)) {
          console.log(':white_check_mark: Questions fetched successfully:', answered.answered.length);
        } else {
          console.log(':white_check_mark: answered is not an array:', answered);
        }
      }
    } else {
      console.log(':x: No answered data found');
    }
    res.json(answered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch answered' });
  }
};
const saveOrUpdateStatus = async (userId: string, answered: boolean[]) => {
  try {
    const query = `
      INSERT INTO status (user_id, answered)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET answered = EXCLUDED.answered
    `;
    await pool.query(query, [userId, JSON.stringify(answered)]);
  } catch (error) {
    console.error(":x: Error saving status:", error);
    throw error;
  }
};
export const createStatus = async (req: Request, res: Response) => {
  const { user_id, questionCount } = req.body;
  try {
    const newStatus = await statusRepository.insertStatus(user_id, questionCount);
    res.status(201).json(newStatus);
  } catch (error) {
    console.error("Error creating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateStatus = async (req: Request, res: Response) => {
  const { user_id, questionIndex } = req.body;
  try {
    const updatedStatus = await statusRepository.updateAnsweredStatus(user_id, questionIndex);
    res.json(updatedStatus);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default { getStatusByUserId , saveOrUpdateStatus };