import { Router } from 'express';
import { getPopularQuestions } from '../controllers/popularQuestionsController';

const router = Router();

router.get('/popular', getPopularQuestions);

export default router;
