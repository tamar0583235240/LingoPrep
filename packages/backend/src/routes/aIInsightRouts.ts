import { Router } from "express";
import {
    getAiInsights, getAiInsightsByAnswerId, createInsightController,
    deleteInsightController,
    updateInsightController,
    getInsightByIdController,
    getAllInsightsController,
} from "../controllers/aIInsightController";

const AiInsightsRouter = Router();

AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
AiInsightsRouter.get('/AiInsights/getAiInsights', getAiInsights);
AiInsightsRouter.get('/', getAllInsightsController);
AiInsightsRouter.post('/', createInsightController);            
AiInsightsRouter.get('/:id', getInsightByIdController);         
AiInsightsRouter.put('/:id', updateInsightController);           
AiInsightsRouter.delete('/:id', deleteInsightController);        


export default AiInsightsRouter;
