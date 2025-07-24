import { Request, Response, NextFunction } from "express";

export const AddQuestionToCategoryMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("addQuestionToCategoryMiddleware called"); 
        const { questionId, categoryId } = req.body;

        if (questionId.length !== 36 || categoryId.length!== 36) {
            return res.status(400).json({ message: "Missing required fields: questionId and categoryId" });
        }

        next();
    } catch (error) {
        console.error("Error in addQuestionToCategoryMiddleware:", error);
        res.status(500).json({ message: "Internal Server Error in middleware" });
    }
}