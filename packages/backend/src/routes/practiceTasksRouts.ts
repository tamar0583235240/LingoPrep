import { Router } from 'express';
import {
  getPracticeTasks,
  getPracticeTaskById,
  createPracticeTask,
  updatePracticeTask,
  deletePracticeTask,
} from '../controllers/practiceTasksController';

const router = Router();

router.get('/:id', getPracticeTaskById);

router.get('/', getPracticeTasks);
router.post('/', createPracticeTask);
router.put('/:id', updatePracticeTask);
router.delete('/:id', deletePracticeTask);

export default router;
