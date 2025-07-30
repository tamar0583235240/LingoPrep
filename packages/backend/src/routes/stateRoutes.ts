// בקובץ stateRoutes.ts
import express from 'express';
import { pool } from '../config/dbConnection';

const router = express.Router();

router.get('/category-users', async (req, res) => {
  try {
    const query = `
      SELECT
        c.name AS category,
        COUNT(DISTINCT a.user_id) AS user_count
      FROM
        answers a
      JOIN
        questions q ON a.question_id = q.id
      JOIN
        question_categories qc ON q.id = qc.question_id
      JOIN
        categories c ON qc.category_id = c.id
      GROUP BY
        c.name
      ORDER BY
        user_count DESC;
    `;

    const { rows } = await pool.query(query);
    res.json(rows); // מחזיר מערך של קטגוריות עם ספירת משתמשים
  } catch (err) {
    console.error('Error fetching category stats:', err);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
});
router.get('/funnel', async (req, res) => {
  try {
    const query = `
      SELECT
        (SELECT COUNT(*) FROM users) AS entrance,
        (SELECT COUNT(DISTINCT user_id) FROM answers) AS simulation_start,
        (SELECT COUNT(DISTINCT user_id) FROM answers WHERE amount_feedbacks > 0) AS simulation_end;
    `;

    const { rows } = await pool.query(query);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching funnel data:', err);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
});
export default router;
