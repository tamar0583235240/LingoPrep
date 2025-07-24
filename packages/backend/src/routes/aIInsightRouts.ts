// <<<<<<< HEAD
import { Router } from "express";
import { getAiInsights, getAiInsightsByAnswerId } from "../controllers/aIInsightController";

const AiInsightsRouter = Router();

AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
AiInsightsRouter.get('/AiInsights/getAiInsights', getAiInsights);  
export default AiInsightsRouter;        
// =======
// import { Router } from 'express';
// import { getAiInsigths} from '../controllers/aIInsightController';

// const router = Router();

// router.get('/',getAiInsigths);
// router.get('/aiInsight',getAiInsigths);

// export default router;
// >>>>>>> Activity-Monitoring
