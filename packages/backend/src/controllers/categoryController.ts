import  categoryRepository  from "../reposioty/categoryRepoisitory";
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

export const addQuestionToCategoryController = async (req: Request, res: Response): Promise<void> => {
    const { question_id, category_id } = req.body; 
    try {
        await categoryRepository.addQuestionToCategory(question_id, category_id);
        res.status(200).json({ message: "Question added to category successfully" });
    } catch (error) {
        console.error("❌ Error adding question to category:", error);
        res.status(500).json({ error: "Failed to add question to category" });
    }
};

export const getCategoryForQuestionsController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const category = await categoryRepository.getCategoryForQuestions(id);
        if (!category) {
            res.status(404).json({ error: "Category not found" });
            return;
        }
        res.json(category);
    } catch (error) {
        console.error("❌ Error fetching category for questions:", error);
        res.status(500).json({ error: "Failed to fetch category for questions" });
    }
};