// import { pool } from '../config/dbConnection';
// import { ReminderType } from "../interfaces/reminderInterfaces";
// import sendEmail from '../utils/sendEmail';

// async function getUsersToRemind() {
//     const result = await pool.query(`
//     SELECT s.user_id, s.type, s.last_seen_sequence, u.email
//     FROM user_reminder_settings s
//     JOIN users u ON u.id = s.user_id
//     WHERE s.is_enabled = true
//       AND (
//         s.last_sent_at IS NULL OR
//         NOW() - s.last_sent_at >=
//         CASE s.frequency
//           WHEN 'daily' THEN interval '1 day'
//           WHEN 'every_2_days' THEN interval '2 days'
//           WHEN 'every_3_days' THEN interval '3 days'
//           WHEN 'weekly' THEN interval '7 days'
//         END
//       )
//   `);
//     return result.rows;
// }

// async function getNextReminderContent(type: "tip" | "practice", lastSeq: number | null) {
//     const table = type === "tip" ? "tips" : "practices";
//     const result = await pool.query(`
//     SELECT * FROM ${table}
//     WHERE sequence_number > $1
//     ORDER BY sequence_number ASC
//     LIMIT 1
//   `, [lastSeq ?? 0]);
//     return result.rows[0] ?? null;
// }

// async function updateReminderSent(userId: string, type: ReminderType, sequence: number) {
//     await pool.query(`
//     UPDATE user_reminder_settings
//     SET last_seen_sequence = $1, last_sent_at = NOW()
//     WHERE user_id = $2 AND type = $3
//   `, [sequence, userId, type]);
// }

// async function processReminders() {

//     const users = await getUsersToRemind();

//     for (const user of users) {
//         const content = await getNextReminderContent(user.type, user.last_seen_sequence);
//         if (!content) continue;

//         // ✅ קריאה תקינה לפונקציית השליחה
//         await sendEmail({
//             to: user.email,
//             subject: 'הנה התזכורת שלך',
//             html: content.text,
//         });

//         await updateReminderSent(user.user_id, user.type, content.sequence_number);
//     }
// }

// export default {
//     getUsersToRemind,
//     getNextReminderContent,
//     updateReminderSent,
//     processReminders,
// };
// src/services/dailyReminderService.ts
;
import { getActiveUserReminderSettingsByDay, getNextContent, updateLastSeen } from "reposioty/reminderRepository2";
import { sendReminderEmail } from "./emailService";


export async function sendDailyReminders() {
  const today = getTodayName();
  if (isShabbat()) return;

  const reminders = await getActiveUserReminderSettingsByDay(today);

  for (const setting of reminders) {
    const nextContent = await getNextContent(setting.type, setting.last_seen_sequence);
    if (!nextContent) continue;

    const emailSent = await sendReminderEmail(setting.user_id, setting.type, nextContent.content);
    if (emailSent) {
      await updateLastSeen(setting.user_id, setting.type, nextContent.sequence_number);
    }
  }
}


// src/utils/dateUtils.ts
export function getTodayName(): string {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

export function isShabbat(): boolean {
  const today = new Date().getDay();
  return today === 6; // Saturday
}
