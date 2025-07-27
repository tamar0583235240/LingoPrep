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

router.get('/details/:recordingId', getRecordingDetails);

router.post('/feedback', createFeedback);

router.put('/feedback/:id', updateFeedback);

export default router;
