import express from "express";
import { addReminder, removeReminder, updateReminder } from "../controllers/reminderController";

const router = express.Router();

router.post("/", addReminder);
router.delete("/:feedbackId", removeReminder);
router.put("/:feedbackId", updateReminder);

export default router;
