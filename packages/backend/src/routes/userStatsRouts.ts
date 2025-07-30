import { Router, Request, Response } from 'express';
import { pool } from '../config/dbConnection';

const router = Router();

router.get('/category-users',  async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT
        q.category,
        COUNT(DISTINCT a.user_id) AS user_count
      FROM
        answers a
      JOIN
        questions q ON a.question_id = q.id
      GROUP BY
        q.category
      ORDER BY
        user_count DESC;
    `;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching category stats:', error);
    res.status(500).json({ message: 'שגיאה בקבלת נתונים' });
  }
});

export default router;
