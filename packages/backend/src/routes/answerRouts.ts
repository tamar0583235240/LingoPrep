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
import {
    getProgressStats, createAnswerController,
    deleteAnswerController,
    updateAnswerController,
    getAnswerByIdController,
    getAllAnswersController,
} from "../controllers/answerController";


const router = Router();
router.get('/getAllAnswersByIdUser/:user_id', answerController);
router.get("/progress/:userId", getProgressStats);
router.get('/', getAllAnswersController);
router.post('/', createAnswerController);
router.get('/:id', getAnswerByIdController);
router.put('/:id', updateAnswerController);
router.delete('/:id', deleteAnswerController);

export default router;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
