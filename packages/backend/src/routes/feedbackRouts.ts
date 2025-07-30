import { Router } from 'express';
import { getFeedbackesByanswerId } from '../controllers/feedbackController';

const feedbackRouter = Router();

feedbackRouter.get('/getFeedbackesByanswerId/:sharedRecordingId', getFeedbackesByanswerId);
export default feedbackRouter;        