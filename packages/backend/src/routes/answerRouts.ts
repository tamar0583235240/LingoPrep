import { Router } from 'express';
import { answerController } from '../controllers/answerController';
import { getProgressStats } from "../controllers/answerController";


const router = Router();
router.get('/getAllAnswersByIdUser/:user_id' ,answerController);
router.get("/progress/:userId", getProgressStats);

export default router;
