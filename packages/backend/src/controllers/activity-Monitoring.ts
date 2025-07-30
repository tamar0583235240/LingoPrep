import express from "express";
import PopularQuestions  from "../controllers/activity-Monitoring";

const router = express.Router();

router.get("/questions/popular", PopularQuestions);

export default router;
