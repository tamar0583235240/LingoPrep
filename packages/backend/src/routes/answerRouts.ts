import { Router } from 'express';
import { answerController } from '../controllers/answerController';
import {
    getProgressStats, createAnswerController,
    deleteAnswerController,
    updateAnswerController,
    getAnswerByIdController,
    getAllAnswersController,
} from "../controllers/answerController";


const router = Router();
router.get('/getAllAnswersByIdUser/:user_id', answerController);
router.get("/progress/:userId", getProgressStats);
router.get('/', getAllAnswersController);
router.post('/', createAnswerController);
router.get('/:id', getAnswerByIdController);
router.put('/:id', updateAnswerController);
router.delete('/:id', deleteAnswerController);

export default router;
