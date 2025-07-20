import { pool } from "../config/dbConnection";

export async function upsertReminderSetting(userId: string, type: string, is_enabled: boolean, frequency: string | null) {
  await pool.query(
    `INSERT INTO user_reminder_settings (user_id, type, frequency, is_enabled)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, type)
     DO UPDATE SET frequency = $3, is_enabled = $4`,
    [userId, type, frequency, is_enabled]
  );
}

export async function getReminderSettingsByUser(userId: string) {
  const { rows } = await pool.query(
    `SELECT type, frequency, is_enabled FROM user_reminder_settings WHERE user_id = $1`,
    [userId]
  );
  return rows;
}

export async function getUsersToSendReminders(reminderType: "tip" | "practice") {
  const { rows } = await pool.query(
    `
    SELECT urs.user_id, urs.type, urs.frequency, urs.last_seen_sequence, urs.last_sent_at, u.email
    FROM user_reminder_settings urs
    JOIN users u ON u.id = urs.user_id
    WHERE urs.type = $1
      AND urs.is_enabled = true
      AND (
        urs.last_sent_at IS NULL OR
        (urs.frequency = 'daily' AND urs.last_sent_at < NOW() - INTERVAL '1 day') OR
        (urs.frequency = 'weekly' AND urs.last_sent_at < NOW() - INTERVAL '7 days')
      )
    `,
    [reminderType]
  );
  return rows;
}

export async function getNextReminderContent(type: string, afterSequence: number) {
  const { rows } = await pool.query(
    `SELECT content, sequence_number FROM reminders WHERE type = $1 AND sequence_number > $2 ORDER BY sequence_number ASC LIMIT 1`,
    [type, afterSequence]
  );
  return rows[0];
}

export async function updateAfterSend(userId: string, type: string, newSequence: number) {
  await pool.query(
    `
    UPDATE user_reminder_settings
    SET last_seen_sequence = $1,
        last_sent_at = NOW()
    WHERE user_id = $2 AND type = $3
    `,
    [newSequence, userId, type]
  );
}

export default {
  upsertReminderSetting,
  getReminderSettingsByUser,
  getUsersToSendReminders,
  getNextReminderContent,
  updateAfterSend,
};
