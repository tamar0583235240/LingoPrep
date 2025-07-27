// import { Router } from "express";
// import { getRemindersController, markReminderAsDoneController } from "../controllers/remindersController";

// const router = Router();

// console.log("🔔 Reminders routes initialized");
// router.get("/", getRemindersController);
// router.post("/:id/done", markReminderAsDoneController);

// export default router;
import { Router } from "express";
import { getRemindersController, markReminderAsDoneController } from "../controllers/remindersController";

const router = Router();

console.log("📂 Reminders router loaded"); // לוג שמראה שהנתיב עלה

router.get("/", (req, res, next) => {
  console.log("➡️ GET /api/reminders נקרא");
  getRemindersController(req, res).catch(next);
});

router.post("/:id/done", (req, res, next) => {
  console.log(`➡️ POST /api/reminders/${req.params.id}/done נקרא`);
  markReminderAsDoneController(req, res).catch(next);
});

export default router;
