import express from "express";
import { getProgressStats, answerController } from "../controllers/answerController";

const router = express.Router();

router.get("/progress/:userId", getProgressStats);
router.get('/getAllAnswersByIdUser/:user_id', answerController);


export default router;
