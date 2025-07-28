
import { getActiveUserReminderSettingsByDay, getNextContent, updateLastSeen } from "../reposioty/reminderRepository2";
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
  return today === 6; 
}
