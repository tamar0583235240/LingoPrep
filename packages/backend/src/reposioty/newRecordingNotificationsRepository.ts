import { pool } from "../config/dbConnection";

export const newRecordingNotificationsRepository = {
  createNotificationsForUsers: async (
    userIds: string[],
    type: string,
    message: string
  ) => {
    const query = `
      INSERT INTO notifications (id, user_id, type, message, is_seen, created_at)
      SELECT gen_random_uuid(), user_id, $1, $2, false, now()
      FROM UNNEST($3::uuid[]) AS user_id
      RETURNING *;
    `;
    const values = [type, message, userIds];
    const result = await pool.query(query, values);
    return result.rows;
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

  getAllManagers: async (): Promise<string[]> => {
    const query = `
      SELECT id FROM users
      WHERE role = 'manager';
    `;
    const result = await pool.query(query);
    return result.rows.map((row) => row.id);
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

  markOneAsSeen: async (userId: string, notificationId: string) => {
    const query = `
    UPDATE notifications
    SET is_seen = true
    WHERE user_id = $1 AND id = $2
    RETURNING *;
  `;
    const result = await pool.query(query, [userId, notificationId]);
    return result.rows[0];
  },
};
