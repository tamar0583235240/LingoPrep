import * as express from 'express';
import {
  createAnswerController,
  deleteAnswerController,
  updateAnswerController,
  getAnswerByIdController,
  getAllAnswersController,
} from '../controllers/answerController';
// import { getAnsweredAnswers } from "../controllers/answerController";


const router = express.Router();
router.get('/', getAllAnswersController);
router.post('/', createAnswerController);             // יצירה
router.get('/:id', getAnswerByIdController);          // שליפה
router.put('/:id', updateAnswerController);           // עדכון
router.delete('/:id', deleteAnswerController);        // מחיקה
// router.get("/answered", getAnsweredAnswers);

export default router;

