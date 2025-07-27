import { Router } from 'express';
import {  getAiInsightsByAnswerId ,getAiInsights} from "../controllers/aIInsightController";
import { auth } from 'google-auth-library';
import { authenticate } from '../middlewares/authenticateMiddleware';

const router = Router();

router.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
router.get('/AiInsights/getAiInsights', getAiInsights);  


export default router;
