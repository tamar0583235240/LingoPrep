import { Request, Response } from "express";
import { getReminders, markReminderAsDone } from "../reposioty/remindersRepository";
export const getRemindersController = async (req: Request, res: Response) => {
  try {
    console.log("🔔 קריאה ל-GET /api/reminders");
    const reminders = await getReminders();
        console.log("📥 נשלפו תזכורות:", reminders); 
    res.json(reminders);
  } catch (error) {
        console.error("שגיאה בשליפת תזכורות", error);
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};
export const markReminderAsDoneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await markReminderAsDone(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update reminder status" });
  }
};
