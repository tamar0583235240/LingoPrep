import { Router } from 'express';
import { getFeedbackesByanswerId } from '../controllers/feedbackController';

const router = Router();

router.get('/feedbackes/getFeedbackesByanswerId/:sharedRecordingId', getFeedbackesByanswerId);  
export default router;        