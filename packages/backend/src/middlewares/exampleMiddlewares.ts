// import { Request, Response, NextFunction } from "express";

// //#region example for implemantaion Middleware
// export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const timestamp = new Date().toISOString();
//         const method = req.method;
//         const url = req.originalUrl;

//         console.log(`[${timestamp}] ${method} ${url}`);

//         next();
//     } catch (error) {
//         console.error("Error in exampleMiddleware:", error);
//         res.status(500).json({ message: "Internal Server Error in middleware" });
//     }
// };
// //#endregion