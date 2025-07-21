<<<<<<< HEAD
import  categoryRepository  from "../reposioty/categoryRepository";
=======
import  categoryRepository  from "../reposioty/categoryRepoisitory";
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
import { Request, Response } from "express";


export const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
<<<<<<< HEAD
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
=======
        const categories = await categoryRepository.getAllCategories();
        console.log('✅ Questions fetched successfully:', categories.length);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error });
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    }
}