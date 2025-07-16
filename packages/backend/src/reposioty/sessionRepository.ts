import { pool } from '../config/dbConnection';
// יוצר רשומה חדשה בטבלה user_sessions עם:
// user_id = מזהה המשתמש// session_id = מזהה הסשן// login_time = הזמן הנוכחי (NOW())
const createSession = async (userId: string, sessionId: string) => {
  console.log("📝 יוצר session חדש:", { userId, sessionId });
  await pool.query(
    `INSERT INTO user_sessions (user_id, session_id, login_time) VALUES ($1, $2, NOW())`,
    [userId, sessionId]
  );
};
// מעדכן שורה בטבלה user_sessions לפי session_id, ומוסיף את זמן היציאה (logout_time)
export const endSession = async (sessionId: string) => {
  console.log("⏰ endSession - sessionId:", sessionId);

  const result = await pool.query(
    `UPDATE user_sessions SET logout_time = NOW() 
     WHERE session_id = $1 AND logout_time IS NULL`,
    [sessionId]
  );

  console.log("📊 מספר שורות שעודכנו ב־logout_time:", result.rowCount);
};

// ספירת משתמשות פעילות וחישוב זמן שהייה ממוצע
const getWeeklyStats = async () => {
  console.log("📊 שולף סטטיסטיקות שבועיות...");
  
  const result = await pool.query(`
    SELECT
      COUNT(DISTINCT user_id) AS active_users,
      COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (logout_time - login_time)) / 60), 2), 0) AS avg_minutes
    FROM user_sessions
    WHERE login_time >= NOW() - INTERVAL '7 days'
      AND logout_time IS NOT NULL
  `);

  console.log("📈 תוצאות סטטיסטיקות:", result.rows[0]);
  return result.rows[0];
};

// סך כל הסשנים.
const getSessionsDebug = async () => {
  const result = await pool.query(`
    SELECT 
      COUNT(*) as total_sessions,
      COUNT(CASE WHEN logout_time IS NOT NULL THEN 1 END) as sessions_with_logout,
      COUNT(CASE WHEN login_time >= NOW() - INTERVAL '7 days' THEN 1 END) as sessions_this_week,
      COUNT(CASE WHEN login_time >= NOW() - INTERVAL '7 days' AND logout_time IS NOT NULL THEN 1 END) as completed_sessions_this_week
    FROM user_sessions
  `);
  console.log("🔍 Debug סטטיסטיקות sessions:", result.rows[0]);
  return result.rows[0];
};

export default {
  createSession,
  endSession,
  getWeeklyStats,
  getSessionsDebug
};