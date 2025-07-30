import express from "express";
import  getPopularQuestions  from "../controllers/activity-Monitoring";

const router = express.Router();

// router.get("/questions/popular", getPopularQuestions);
router.get("/questions/popular", getPopularQuestions);

export default router;
