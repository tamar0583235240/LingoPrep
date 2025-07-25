import { Router } from "express";
import { getRemindersController, markReminderAsDoneController } from "../controllers/remindersController";

const router = Router();
console.log("Reminders router loaded");

console.log("🔔 Reminders routes initialized");
router.get("/", getRemindersController);
router.post("/:id/done", markReminderAsDoneController);

export default router;
