import { Router } from 'express';
import { addQuestion } from '../controllers/questionController';
import { addQuestionMiddleware } from '../middlewares/questionMiddlewares';
import { adminqQuestionController, deleteQuestionController, questionController,updateQuestionController } from "../controllers/questionController";


const router = Router();

router.post('/questions/addQuestion', addQuestionMiddleware, addQuestion);
router.get('/getAllQuestionById/:question_id', questionController );
router.get('/getAllQuestions', adminqQuestionController );
router.put('/updateQuestion', updateQuestionController);
router.patch('/deleteQuestionById/:question_id', deleteQuestionController);
export default router;
