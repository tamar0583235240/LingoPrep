// src/jobs/reminderJob.ts
import cron from "node-cron";
import { sendDailyReminders } from "../services/dailyReminderService";

export const scheduleReminders = () => {
  cron.schedule("0 9 * * *", async () => {
    console.log("\uD83D\uDCEC Running reminder job...");
    await sendDailyReminders();
  });
};