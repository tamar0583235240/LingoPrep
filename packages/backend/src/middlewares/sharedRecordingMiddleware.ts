import { Request, Response, NextFunction } from "express";

export const sharedRecordingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(`[SharedRecording] ${req.method} ${req.originalUrl}`);
    next();
  } catch (error) {
    console.error("Error in sharedRecordingMiddleware:", error);
    res.status(500).json({ message: "Internal Server Error in middleware" });
  }
};
