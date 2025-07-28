import { Router } from 'express';
import { addQuestion } from '../controllers/questionController';
import { addQuestionMiddleware } from '../middlewares/questionMiddlewares';
import {
    adminqQuestionController, deleteQuestionController, questionController, updateQuestionController,
     getAllQuestionsController
} from "../controllers/questionController";
import { get } from 'http';
import { getProgressStats } from 'controllers/answerController';


const router = Router();


router.post('/addQuestion', addQuestionMiddleware, addQuestion);
router.get('/getAllQuestionById/:question_id', questionController);
router.get('/getAllQuestions', adminqQuestionController);
router.put('/updateQuestion', updateQuestionController);
router.patch('/deleteQuestionById/:question_id', deleteQuestionController);
router.get('/', getAllQuestionsController);

export default router;