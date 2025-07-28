// src/repository/reminderRepository2.ts

import { ReminderType } from "@interfaces/reminderInterfaces";
import { pool } from "../config/dbConnection";

export async function getActiveUserReminderSettingsByDay(dayName: string) {
  const { rows } = await pool.query(`
    SELECT * FROM user_reminder_settings
    WHERE is_enabled = true
      AND (
        frequency = 'daily'
        OR (frequency = 'every_2_days' AND $1 IN ('Sunday', 'Thursday'))
        OR (frequency = 'every_3_days' AND $1 IN ('Sunday', 'Tuesday', 'Thursday'))
        OR (frequency = 'weekly' AND $1 = 'Sunday')
      )
  `, [dayName]);
  return rows;
}

export async function getNextContent(type: ReminderType, lastSeen: number | null) {
  const table = type === "tip" ? "tips" : "practices";
  const { rows } = await pool.query(
    `SELECT * FROM ${table} WHERE sequence_number > $1 ORDER BY sequence_number ASC LIMIT 1`,
    [lastSeen ?? 0]
  );
  return rows[0];
}

export async function updateLastSeen(userId: string, type: ReminderType, sequence: number) {
  await pool.query(
    `UPDATE user_reminder_settings SET last_seen_sequence = $1, last_sent_at = NOW() WHERE user_id = $2 AND type = $3`,
    [sequence, userId, type]
  );
}