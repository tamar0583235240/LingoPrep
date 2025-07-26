// routes/aiInsightRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import {
  createInsightController,
  getAllInsightsController,
  getInsightByIdController,
  updateInsightController,
  deleteInsightController,
  analyzeAndSaveInsight
} from '../controllers/aIInsightController';

// קונפיגורציה לשמירת קבצים זמנית
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 }
});

const router = Router();

// 🔍 ניתוח אודיו
router.post('/analyze', upload.single('audio'), analyzeAndSaveInsight);

// 🔁 פעולות CRUD רגילות
router.post('/', createInsightController);
router.get('/', getAllInsightsController);
router.get('/:id', getInsightByIdController);
router.put('/:id', updateInsightController);
router.delete('/:id', deleteInsightController);

export default router;
