import { Router } from "express";
import {  addCategoryController, getAllCategoriesController, getCategoryForQuestionsController } from "../controllers/categoryController";


const router = Router();

router.get('/', getAllCategoriesController)
router.post('/addCategory', addCategoryController);
router.get('/getCategoryForQuestions/:id', getCategoryForQuestionsController);
export default router;