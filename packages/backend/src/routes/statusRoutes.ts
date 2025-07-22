import { Router } from 'express';
import { getUserAnsweredQuestionsControler } from '../controllers/statusController';
const router = Router();

router.get('/answered/:userId', getUserAnsweredQuestionsControler);

export default router;