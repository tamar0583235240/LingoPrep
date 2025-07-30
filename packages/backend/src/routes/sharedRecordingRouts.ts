import { Router } from 'express';
import {
  getSharedRecordingsByUser,
  getRecordingDetails,
  createFeedback,
  updateFeedback,
  getPreviouslySharedEmails,
  getSharedRecordingParticipants,
  deleteParticipant,
  addParticipant
} from '../controllers/sharedRecordingController';
import { sharedRecordingMiddleware } from '../middlewares/sharedRecordingMiddleware';

const router = Router();

router.use(sharedRecordingMiddleware);
router.get('/', getSharedRecordingsByUser);
router.post('/feedback', createFeedback);
router.put('/feedback/:id', updateFeedback);
router.get('/getSharedRecordingParticipants/:answerId/:ownerId', getSharedRecordingParticipants);
router.get('/sharedEmails/:userId', getPreviouslySharedEmails);
router.delete('/deleteParticipant', deleteParticipant);
router.post('/addParticipant', addParticipant);
router.get('/:userId/:role', getSharedRecordingsByUser);

export default router;
