import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
console.log("📦 [authMiddlewares] JWT_SECRET loaded:", JWT_SECRET);

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  console.log("🔐 Auth Header:", authHeader);
  console.log("🔐 Extracted token:", token);

  if (!token) {
    console.log("🚫 לא סופק טוקן");
    return res.status(401).json({ message: 'לא סופק טוקן' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("🚫 טוקן לא תקין:", err);
      return res.status(403).json({ message: 'טוקן לא תקין' });
    }

    console.log("✅ טוקן אומת בהצלחה:", user);
    // @ts-ignore
    req.user = user;
    next();
  });
};
