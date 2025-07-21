import { Router } from 'express';
import { getAllQuestionsController, getQuestionsByCategoryController } from '../controllers/questionController';

const router = Router();

router.get('/questions', getAllQuestionsController);
router.get('/questions/category/:categoryId', getQuestionsByCategoryController);

export default router;
