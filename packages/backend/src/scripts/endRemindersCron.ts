// packages/backend/src/scripts/endRemindersCron.ts
import dotenv from "dotenv";
dotenv.config();
import { sendDailyReminders } from "../services/dailyReminderService";

sendDailyReminders().then(() => {
  console.log("Daily reminders sent");
});
