
// 📦 sessionRepository.ts – כולל סטטיסטיקות שבועיות + יומיות
import { pool } from '../config/dbConnection';

const createSession = async (userId: string, sessionId: string) => {
  await pool.query(
    `INSERT INTO user_sessions (user_id, session_id, login_time) VALUES ($1, $2, NOW())`,
    [userId, sessionId]
  );
};

export const endSession = async (sessionId: string) => {
  await pool.query(
    `UPDATE user_sessions SET logout_time = NOW() 
     WHERE session_id = $1 AND logout_time IS NULL`,
    [sessionId]
  );
};

const getWeeklyStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(DISTINCT user_id) AS active_users,
      COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (logout_time - login_time)) / 60), 2), 0) AS avg_minutes
    FROM user_sessions
    WHERE login_time >= NOW() - INTERVAL '7 days'
      AND logout_time IS NOT NULL
  `);
  return result.rows[0];
};

const getDailyStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(DISTINCT user_id) AS active_users,
      COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (logout_time - login_time)) / 60), 2), 0) AS avg_minutes
    FROM user_sessions
    WHERE login_time::date = CURRENT_DATE
      AND logout_time IS NOT NULL
  `);
  return result.rows[0];
};

export default {
  createSession,
  endSession,
  getWeeklyStats,
  getDailyStats
};
