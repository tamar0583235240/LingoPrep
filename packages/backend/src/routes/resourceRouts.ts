import { Router, Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import { uploadRecording } from '../controllers/resourceController';
import multerConfig from '../config/multerConfig';

const router = Router();

// הגדרת מגבלות העלאת קבצים
const upload = multer({
  ...multerConfig,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1
  }
});

// Wrap multer middleware to handle errors
const handleMulterErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred
    console.error('❌ Multer error:', err);
    return res.status(400).json({
      error: `File upload error: ${err.message}`
    });
  } else if (err) {
    // Unknown error occurred
    console.error('❌ Unknown upload error:', err);
    return res.status(500).json({
      error: 'Unknown error occurred during file upload'
    });
  }
  next();
};

// Route for file upload with error handling
router.post('/uploadRecord',
  upload.single('file'),
  handleMulterErrors,
  uploadRecording
);

export default router;