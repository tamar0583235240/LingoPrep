import { pool } from "../config/dbConnection";

export const notificationRepository = {
  createNotification: async (userId: string, type: string, message: string) => {
    const query = `
      INSERT INTO notifications (id, user_id, type, message, is_seen, created_at)
      VALUES (gen_random_uuid(), $1, $2, $3, false, now())
      RETURNING *;
    `;
    const values = [userId, type, message];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getUnreadNotificationsByUser: async (userId: string) => {
    const query = `
      SELECT * FROM notifications
      WHERE user_id = $1 AND is_seen = false
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  markAllAsSeen: async (userId: string) => {
    const query = `
      UPDATE notifications
      SET is_seen = true
      WHERE user_id = $1 AND is_seen = false
      RETURNING *;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },
};
