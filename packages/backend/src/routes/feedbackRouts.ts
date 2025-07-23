import { Router } from 'express';
import { getFeedbackesByanswerId, createFeedback, getAllFeedbacksByUserId } from '../controllers/feedbackController';

const feedbackRouter = Router();

feedbackRouter.get('/feedbacks/:userId', getAllFeedbacksByUserId);
feedbackRouter.get('/feedbacks/getFeedbackesByanswerId/:sharedRecordingId', getFeedbackesByanswerId);
feedbackRouter.post('/feedbacks/create', createFeedback);

export default feedbackRouter;