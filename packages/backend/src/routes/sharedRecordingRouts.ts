import { Router } from 'express';
import { getSharedRecordingParticipants, getPreviouslySharedEmails, deleteParticipant, addParticipant } from '../controllers/sharedRecordingController';

const router = Router();

router.get('/getSharedRecordingParticipants/:answerId/:ownerId', getSharedRecordingParticipants);
router.get('/sharedEmails/:userId', getPreviouslySharedEmails);
router.delete('/deleteParticipant', deleteParticipant);
router.post('/addParticipant', addParticipant);
// בדיקה
router.get('/', (req, res) => {
  res.send('Shared Recordings API is working');
});

export default router;
