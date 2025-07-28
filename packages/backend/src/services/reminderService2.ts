// import { getActiveUserReminderSettingsByDay, getNextContent, updateLastSeen } from "../repository/reminderRepository";
// import { sendReminderEmail } from "./emailService";
// import { getTodayName, isShabbat } from "../utils/dateUtils";

// export async function sendDailyReminders() {
//   const today = getTodayName();
//   if (isShabbat()) return;

//   const reminders = await getActiveUserReminderSettingsByDay(today);

//   for (const setting of reminders) {
//     const nextContent = await getNextContent(setting.type, setting.last_seen_sequence);

//     if (!nextContent) continue;

//     const emailSent = await sendReminderEmail(setting.user_id, setting.type, nextContent.content);
//     if (emailSent) {
//       await updateLastSeen(setting.user_id, setting.type, nextContent.sequence_number);
//     }
//   }
// }
