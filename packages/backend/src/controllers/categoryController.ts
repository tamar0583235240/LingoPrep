import  categoryRepository  from "../reposioty/categoryRepository";
import { Request, Response } from "express";


export const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryRepository.getAllCategories();
        console.log('✅ Questions fetched successfully:', categories.length);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error });
    }
}