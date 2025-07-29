// // import { pool } from '../config/dbConnection';

// // const createSession = async (userId: string, sessionId: string) => {
// //   await pool.query(
// //     `INSERT INTO user_sessions (user_id, session_id, login_time) VALUES ($1, $2, NOW())`,
// //     [userId, sessionId]
// //   );
// // };

// // const endSession = async (sessionId: string) => {
// //   await pool.query(
// //     `UPDATE user_sessions SET logout_time = NOW() WHERE session_id = $1`,
// //     [sessionId]
// //   );
// // };

// // // ספירת משתמשות פעילות
// // // חישוב זמן שהייה ממוצע
// // const getWeeklyStats = async () => {
// //   const result = await pool.query(`
// //     SELECT
// //       COUNT(DISTINCT user_id) AS active_users,
// //       COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (logout_time - login_time)) / 60), 2), 0) AS avg_minutes
// //     FROM user_sessions
// //     WHERE login_time >= NOW() - INTERVAL '7 days'
// //       AND logout_time IS NOT NULL
// //   `);

// //   return result.rows[0];
// // };

// // export default {
// //   createSession,
// //   endSession,
// //   getWeeklyStats
// // };


// // בקובץ sessionRepository.ts
// import { pool } from '../config/dbConnection';

// const createSession = async (userId: string, sessionId: string) => {
//   console.log("📝 יוצר session חדש:", { userId, sessionId });
//   await pool.query(
//     `INSERT INTO user_sessions (user_id, session_id, login_time) VALUES ($1, $2, NOW())`,
//     [userId, sessionId]
//   );
// };
// // מחקתי
// // const endSession = async (sessionId: string) => {
// //   console.log("⏰ מעדכן logout time עבור sessionId:", sessionId);
// //   const result = await pool.query(
// //     `UPDATE user_sessions SET logout_time = NOW() WHERE session_id = $1 AND logout_time IS NULL`,
// //     [sessionId]
// //   );
// //   console.log("🔄 מספר שורות שעודכנו:", result.rowCount);
// //   return result.rowCount;
// // };
// // const endSession = async (sessionId: string) => {
// //   console.log("⏰ מעדכן logout time עבור sessionId:", sessionId);
// //   const result = await pool.query(
// //     `UPDATE user_sessions SET logout_time = NOW() WHERE session_id = $1`,
// //     [sessionId]
// //   );
// //   console.log("🔁 logout_time עודכן:", result.rowCount);
// // };

// export const endSession = async (sessionId: string) => {
//   console.log("⏰ endSession - sessionId:", sessionId);

//   const result = await pool.query(
//     `UPDATE user_sessions SET logout_time = NOW() 
//      WHERE session_id = $1 AND logout_time IS NULL`,
//     [sessionId]
//   );

//   console.log("📊 מספר שורות שעודכנו ב־logout_time:", result.rowCount);
// };


// // ספירת משתמשות פעילות וחישוב זמן שהייה ממוצע
// const getWeeklyStats = async () => {
//   console.log("📊 שולף סטטיסטיקות שבועיות...");
  
//   const result = await pool.query(`
//     SELECT
//       COUNT(DISTINCT user_id) AS active_users,
//       COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (logout_time - login_time)) / 60), 2), 0) AS avg_minutes
//     FROM user_sessions
//     WHERE login_time >= NOW() - INTERVAL '7 days'
//       AND logout_time IS NOT NULL
//   `);

//   console.log("📈 תוצאות סטטיסטיקות:", result.rows[0]);
//   return result.rows[0];
// };

// // פונקציה חדשה לבדיקת נתונים
// const getSessionsDebug = async () => {
//   const result = await pool.query(`
//     SELECT 
//       COUNT(*) as total_sessions,
//       COUNT(CASE WHEN logout_time IS NOT NULL THEN 1 END) as sessions_with_logout,
//       COUNT(CASE WHEN login_time >= NOW() - INTERVAL '7 days' THEN 1 END) as sessions_this_week,
//       COUNT(CASE WHEN login_time >= NOW() - INTERVAL '7 days' AND logout_time IS NOT NULL THEN 1 END) as completed_sessions_this_week
//     FROM user_sessions
//   `);
  
//   console.log("🔍 Debug סטטיסטיקות sessions:", result.rows[0]);
//   return result.rows[0];
// };

// export default {
//   createSession,
//   endSession,
//   getWeeklyStats,
//   getSessionsDebug
// };




// כולל אני ושרי
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
