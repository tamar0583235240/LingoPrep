import { Router } from 'express';
import {
  getSharedRecordingsByUser,
  getRecordingDetails,
  createFeedback,
  updateFeedback
} from '../controllers/sharedRecordingController';
import { sharedRecordingMiddleware } from '../middlewares/sharedRecordingMiddleware';

const router = Router();

router.use(sharedRecordingMiddleware);
router.get('/', getSharedRecordingsByUser);
router.post('/feedback', createFeedback);
router.put('/feedback/:id', updateFeedback);
router.get('/:userId/:role', getSharedRecordingsByUser);

export default router;
