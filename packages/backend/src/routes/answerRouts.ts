<<<<<<< HEAD
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

=======
import { Router } from 'express';
import { answerController } from '../controllers/answerController';
import { getProgressStats } from "../controllers/answerController";


const router = Router();
router.get('/getAllAnswersByIdUser/:user_id' ,answerController);
router.get("/progress/:userId", getProgressStats);

export default router;
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
