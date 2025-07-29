import { Request, Response } from "express";
import { newRecordingNotificationsRepository } from "../reposioty/newRecordingNotificationsRepository";

export const getUnreadNotifications = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const notifications = await newRecordingNotificationsRepository.getUnreadNotificationsByUser(userId);
  res.json(notifications);
};

export const markAllNotificationsAsSeen = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const result = await newRecordingNotificationsRepository.markAllAsSeen(userId);
  res.json(result);
};

export const notifyAllManagers = async () => {
  const managerIds = await newRecordingNotificationsRepository.getAllManagers();
  if (managerIds.length === 0) return;

  await newRecordingNotificationsRepository.createNotificationsForUsers(
    managerIds,
    "recording",
    "A new recording was submitted."
  );
};

export const markNotificationAsSeen = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const notificationId = req.params.id;
  if (!userId || !notificationId) return res.status(400).json({ message: "Missing data" });

  await newRecordingNotificationsRepository.markOneAsSeen(userId, notificationId);
  res.json({ success: true });
};