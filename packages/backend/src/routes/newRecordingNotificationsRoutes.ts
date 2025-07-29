import { authenticateToken } from "../middlewares/authMiddlewares";
import {
  getUnreadNotifications,
  markAllNotificationsAsSeen,
  markNotificationAsSeen,
} from "../controllers/newRecordingNotificationsController";
import express from "express";

const router = express.Router();

router.get("/", authenticateToken, getUnreadNotifications);
router.patch("/mark-all-seen", authenticateToken, markAllNotificationsAsSeen);
router.patch("/:id/mark-seen", authenticateToken, markNotificationAsSeen);


export default router;
