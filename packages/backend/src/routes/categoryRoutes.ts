import { Router } from "express";
import { addQuestionToCategoryController, getAllCategoriesController, getCategoryForQuestionsController } from "../controllers/categoryController";


const router = Router();

router.get('/', getAllCategoriesController)
router.post('/addQuestionToCategory', addQuestionToCategoryController);
router.get('/getCategoryForQuestions/:id', getCategoryForQuestionsController);
export default router;