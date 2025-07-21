import { Router } from 'express';
import { getAllQuestionsController, getQuestionsByCategoryController } from '../controllers/questionController';
// import { exampleMiddleware } from '../middlewares/exampleMiddlewares'; // אם יש לך

const router = Router();

router.get('/', getAllQuestionsController);
router.get('/category/:categoryId', getQuestionsByCategoryController);

export default router;
