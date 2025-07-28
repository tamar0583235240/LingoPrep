import { Request, Response } from "express";
import { getReminders, markReminderAsDone } from "../repository/remindersRepository";
export const getRemindersController = async (req: Request, res: Response) => {
   console.log("📥 נכנסנו ל־getAllReminders");
  try {
        console.log("🔔 נכנסנו ל-getRemindersController");

    console.log("🔔 קריאה ל-GET /api/reminders");
    const reminders = await getReminders();
        console.log("📥 נשלפו תזכורות:", reminders); 
    res.json(reminders);
  } catch (error) {
      console.error("שגיאה בשליפת תזכורות:", (error as any).message || error);

        // console.error("שגיאה בשליפת תזכורות", error);
        console.error("שגיאה בשליפת תזכורות:", error instanceof Error ? error.message : error);

    res.status(500).json({ error: "Failed to fetch reminders" });

  }
};
export const markReminderAsDoneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
        console.log("Received id in markReminderAsDoneController:", id);

    await markReminderAsDone(id);
    res.json({ success: true });
  } 
  catch (error) {
        console.error("Error in markReminderAsDoneController:", error);

    res.status(500).json({ error: "Failed to update reminder status" });
  }
};
