import { pool } from '../config/dbConnection';
import express from 'express';

const router = express.Router();

router.get('/funnel', async (req, res) => {
  try {
   const { rows } = await pool.query(`
  SELECT
    COUNT(*) FILTER (WHERE page = 'login') AS entrance,
    COUNT(*) FILTER (WHERE page = 'simulation_start') AS simulation_start,
    COUNT(*) FILTER (WHERE page = 'simulation_end') AS simulation_end
  FROM user_activity_log
`);

res.json({
  entrance: parseInt(rows[0].entrance),
  simulation_start: parseInt(rows[0].simulation_start),
  simulation_end: parseInt(rows[0].simulation_end),
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
