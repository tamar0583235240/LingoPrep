import { Router } from "express";
import { getAllCategoriesController } from "../controllers/categoryController";


const router = Router();

router.get('/', getAllCategoriesController)

export default router;