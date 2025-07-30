import { Request, Response } from 'express';
import { pool } from '../config/dbConnection';

export const getPopularQuestions = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;
  console.log("OFFSET שנשלח:", offset); 

  try {
    const result = await pool.query(`
      SELECT 
        q.id,
        q.title AS question,
        COUNT(a.id) AS popularity
      FROM public.questions q
      LEFT JOIN public.answers a ON a.question_id = q.id
      GROUP BY q.id, q.title
      ORDER BY popularity DESC, q.id 
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching popular questions:', error);
    res.status(500).json({ message: 'שגיאה בקבלת שאלות פופולריות' });
  }
};
