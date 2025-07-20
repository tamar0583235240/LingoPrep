import { Router } from "express";
import { getAiInsights, getAiInsightsByAnswerId } from "../controllers/aIInsightController";

const AiInsightsRouter = Router();

AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
AiInsightsRouter.get('/AiInsights/getAiInsights', getAiInsights);  


export default AiInsightsRouter;
