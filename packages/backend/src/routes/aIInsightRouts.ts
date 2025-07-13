import { Router } from 'express';
import {  getAiInsightsByAnswerId ,getAiInsights} from "../controllers/aIInsightController";

const AiInsightsRouter = Router();

AiInsightsRouter.get('/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
AiInsightsRouter.get('/',getAiInsights);
export default AiInsightsRouter;        

