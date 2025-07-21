import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

// דוגמת Middleware
const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware רץ");
  next();
};

// דוגמת Controller
const exampleController = (req: Request, res: Response) => {
  res.send("הכל עובד תקין!");
};

router.get('/exampleURL', exampleMiddleware, exampleController);

export default router;
