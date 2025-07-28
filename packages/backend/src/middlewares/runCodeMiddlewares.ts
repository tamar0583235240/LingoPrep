import { Request, Response, NextFunction } from 'express';

export const validateRunCode = (req: Request, res: Response, next: NextFunction) => {
  const { language, code } = req.body;

  if (typeof language !== 'string' || language.trim() === '') {
    return res.status(400).json({ message: 'חסר או שדה שגוי: language' });
  }

  if (typeof code !== 'string' || code.trim() === '') {
    return res.status(400).json({ message: 'חסר או שדה שגוי: code' });
  }

  next();
};