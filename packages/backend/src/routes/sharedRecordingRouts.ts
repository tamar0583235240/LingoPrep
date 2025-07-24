import { Router } from 'express';
import { getSharedRecordingParticipants, getPreviouslySharedEmails, deleteParticipant, addParticipant } from '../controllers/sharedRecordingController';

const router = Router();

router.get('/getSharedRecordingParticipants/:answerId/:ownerId', getSharedRecordingParticipants);
router.get('/sharedEmails/:userId', getPreviouslySharedEmails);
router.delete('/deleteParticipant', deleteParticipant);
router.post('/addParticipant', addParticipant);


export default router;
