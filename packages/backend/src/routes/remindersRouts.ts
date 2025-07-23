import { Router } from "express";
import { getRemindersController, markReminderAsDoneController } from "../controllers/remindersController";

const router = Router();


router.get("/", getRemindersController);
router.post("/:id/done", markReminderAsDoneController);

export default router;
