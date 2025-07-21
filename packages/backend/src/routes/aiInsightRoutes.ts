import { Router, Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import { createInsightController } from "../controllers/aIInsightController";
import multerConfig from "../config/multerConfig";

const router = Router();

// הגדרת מגבלות העלאת קבצים להקלטות
const upload = multer({
  ...multerConfig,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1
  }
});

// טיפול בשגיאות העלאה
const handleUploadErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof MulterError) {
    console.error('❌ Multer error:', err);
    return res.status(400).json({
      error: `File upload error: ${err.message}`
    });
  } else if (err) {
    console.error('❌ Unknown upload error:', err);
    return res.status(500).json({
      error: 'Unknown error occurred during file upload'
    });
  }
  next();
};

// Route for AI analysis with error handling
router.post("/analyze", 
  upload.single("audio"),
  handleUploadErrors,
  createInsightController
);

export default router;
