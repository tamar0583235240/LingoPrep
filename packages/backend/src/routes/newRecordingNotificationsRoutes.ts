import {
  getUnreadNotifications,
  markAllNotificationsAsSeen,
} from "../controllers/newRecordingNotificationsController";
import express from "express";

const router = express.Router();

router.get("/", getUnreadNotifications);
router.patch("/mark-all-seen", markAllNotificationsAsSeen);

export default router;