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

export const addCategoryController = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: "Category name is required" });
        return;
    }
    try {
        await categoryRepository.addCategory(name);
        res.status(201).json({ message: "Category added successfully" });
    } catch (error) {
        console.error("❌ Error adding category:", error);
        res.status(500).json({ error: "Failed to add category" });
    }
};