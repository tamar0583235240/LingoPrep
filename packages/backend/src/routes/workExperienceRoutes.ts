import { Router } from 'express';
import {
  getAllWorkExperiences,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience
} from '../controllers/workExperienceController';

const router = Router();

router.get('/', getAllWorkExperiences);
router.post('/', createWorkExperience);
router.put('/:id', updateWorkExperience);
router.delete('/:id', deleteWorkExperience);

export default router;