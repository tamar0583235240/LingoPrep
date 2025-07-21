import  categoryRepository  from "../reposioty/categoryRepository";
import { Request, Response } from "express";


export const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('🔍 Fetching all categories...');
        const categories = await categoryRepository.getAllCategories();
        console.log('✅ Categories fetched successfully:', categories.length);
        res.json(categories);
    } catch (error: any) {
        console.error('❌ Error in getAllCategoriesController:', error);
        res.status(500).json({ 
            error: error.message || 'שגיאה בשליפת הקטגוריות',
            details: error.stack
        });
    }
}