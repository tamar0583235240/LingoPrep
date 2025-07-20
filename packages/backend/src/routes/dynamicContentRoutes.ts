import { Router } from 'express';
import { getAllDynamicContents, updateDynamicContent } from '../controllers/DynamicContentController';

const router = Router();

router.get('/', getAllDynamicContents);
router.put('/:id', updateDynamicContent);

export default router;
