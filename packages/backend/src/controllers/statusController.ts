import { Request, Response } from 'express';
import statusRepository from '../reposioty/statusRepository';
import { pool } from '../reposioty/answerRepository';
export const getStatusByUserId = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
console.log(":inbox_tray: userId from params:", userId);
  try {
    const answered = await statusRepository.getStatusByUserId(userId);
    console.log(":white_check_mark: answered result:", answered);
    console.log(':white_check_mark: Questions fetched successfully:', answered.length);
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
export default { getStatusByUserId , saveOrUpdateStatus };