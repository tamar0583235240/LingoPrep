import { Router } from 'express';
import {  getAiInsightsByAnswerId ,getAiInsights} from "../controllers/aIInsightController";

<<<<<<< HEAD
import * as express from 'express';
import {
  createInsightController,
  deleteInsightController,
  updateInsightController,
  getInsightByIdController,
  getAllInsightsController,
} from '../controllers/aIInsightController';

const router = express.Router();
router.get('/', getAllInsightsController);
router.post('/', createInsightController);             // יצירה
router.get('/:id', getInsightByIdController);          // שליפה
router.put('/:id', updateInsightController);           // עדכון
router.delete('/:id', deleteInsightController);        // מחיקה


export default router;
=======
const AiInsightsRouter = Router();

AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
AiInsightsRouter.get('/AiInsights/getAiInsights', getAiInsights);  


export default AiInsightsRouter;
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
