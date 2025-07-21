import { Router } from 'express';
<<<<<<< HEAD
import { getAllQuestionsController, getQuestionsByCategoryController } from '../controllers/questionController';

const router = Router();

router.get('/questions', getAllQuestionsController);
router.get('/questions/category/:categoryId', getQuestionsByCategoryController);
=======
import { addQuestion } from '../controllers/questionController';
import { addQuestionMiddleware } from '../middlewares/questionMiddlewares';
import {
    adminqQuestionController, deleteQuestionController, questionController, updateQuestionController,
    getQuestionsByCategoryController, getAllQuestionsController
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
router.get('/category/:categoryId', getQuestionsByCategoryController);
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

export default router;