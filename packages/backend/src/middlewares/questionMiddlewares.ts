import { Request, Response, NextFunction } from "express";

export const addQuestionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = req.originalUrl;
        const question = req.body;
        console.log(question);
        // if(!question.title || !question.content || !question.category || !question.tips || !question.aiGuidance || !question.isActive) {
        //     return res.status(400).json({ message: "Missing required fields" });
        // }

        console.log(`[${timestamp}] ${method} ${url}`);

        next();
    } catch (error) {
        console.error("Error in exampleMiddleware:", error);
        res.status(500).json({ message: "Internal Server Error in middleware" });
    }
};
