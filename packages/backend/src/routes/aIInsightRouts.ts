import { Router } from 'express';
import { getAiInsights, getAiInsightsByAnswerId } from '../controllers/aIInsightController';

const router = Router();

// שליפת כל התובנות
router.get('/', getAiInsights);
router.get('/getAiInsights', getAiInsights);

// שליפת תובנות לפי מזהה תשובה
router.get('/byAnswer/:answerId', getAiInsightsByAnswerId); // לדוגמה: GET /aiInsights/byAnswer/1234

export default router;
