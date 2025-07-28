import express from "express";
import { runCodeController } from "../controllers/runCodeController";
import { validateRunCode } from '../middlewares/runCodeMiddlewares';
import {
    getAllQuestions,
    getAllTopics,
    setQuestionLike,
    getQuestionLikes,
    getAllLikes,
    getUserQuestionStatuses,
    updateQuestionStatus,
    saveUserAnswer,
    sendEmail,
    getUserAnswerByQuestion,
    deleteUserAnswerByQuestion
} from "../controllers/codeQuestionsController";

const router = express.Router();

router.get("/topics", getAllTopics);
router.get("/questions", getAllQuestions);
router.post("/runCode", validateRunCode, runCodeController);
router.get("/getQuestionStatus/:userId", getUserQuestionStatuses);

// ניתוב לשליפת תשובת משתמש לשאלה מסוימת
router.get('/userAnswer/:userId/:questionId', getUserAnswerByQuestion);

// מחיקת תשובת משתמש לשאלה מסוימת
router.delete("/deleteUserAnswer/:userId/:questionId", deleteUserAnswerByQuestion);

// עדכון סטטוס בלבד
router.post("/question/status", updateQuestionStatus);

// שמירת תשובה של המשתמש
router.post("/question/answer", saveUserAnswer);

// הוספת לייק או דיסלייק
router.post("/likes", setQuestionLike);

// שליפת ספירת לייקים ודיסלייקים לשאלה
router.get("/likes/:questionId", getQuestionLikes);

// שליפת כל הלייקים לכל השאלות
router.get("/allLikes", getAllLikes);

router.post('/sendEmail', sendEmail);

export default router;
