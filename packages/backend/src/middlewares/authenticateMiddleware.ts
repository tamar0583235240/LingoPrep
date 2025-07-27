import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = decoded; // אם יש לך טיפוס מתאים
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
