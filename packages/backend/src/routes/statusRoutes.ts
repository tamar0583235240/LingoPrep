import { Router } from 'express';
import { getUserAnsweredQuestionsControler } from '../controllers/statusController';
const router = Router();

router.get('/answered/:userId', getUserAnsweredQuestionsControler);

// הוספת ראוט תואם ל-frontend
router.get('/answers/user/:userId/category/:categoryId', (req, res) => {
  req.query.category = req.params.categoryId;
  getUserAnsweredQuestionsControler(req, res);
});

export default router;