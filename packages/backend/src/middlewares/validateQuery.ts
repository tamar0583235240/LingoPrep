// 📁 src/middlewares/validateQuery.ts
import { Request, Response, NextFunction } from 'express';

export const validateTipType = (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.query;
  if (type && type !== 'practice' && type !== 'practical') {
    return res.status(400).json({ message: 'Invalid tip type' });
  }
  next();
};
