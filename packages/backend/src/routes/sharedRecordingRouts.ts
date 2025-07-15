import { Router } from 'express';
import {
  getSharedRecordingsByUser,
  getRecordingDetails,
  createFeedback,
  updateFeedback
} from '../controllers/sharedRecordingController';
import { sharedRecordingMiddleware } from '../middlewares/sharedRecordingMiddleware';

const router = Router();

// מפעיל את המידלוואר על כל הראוטים בקובץ הזה
router.use(sharedRecordingMiddleware);

// בקשה לכל ההקלטות ששיתפו עם משתמש
router.get('/', getSharedRecordingsByUser);

// בקשה לפרטי הקלטה מסוימת לפי ID
router.get('/details/:recordingId', getRecordingDetails);

// שליחת פידבק חדש
router.post('/feedback', createFeedback);

// עדכון פידבק קיים
router.put('/feedback/:id', updateFeedback);

export default router;
