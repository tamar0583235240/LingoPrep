import { Router } from 'express';
import { addPractice, deletePracticeController, adminPracticeController, updatePracticeController } from '../controllers/practicesController';


const router = Router();


router.post('/addPractice', addPractice);
router.get('/', adminPracticeController);
router.put('/updatePractice', updatePracticeController);
router.patch('/deletePracticeById/:practice_id', deletePracticeController);

export default router;
