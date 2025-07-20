import { Router } from 'express';
import multer from 'multer'
import { addInterviewMaterialSub, updateInterviewMaterialSub } from '../controllers/InterviewMaterialSubController';
import { getInterviewMaterialSubs } from '../controllers/InterviewMaterialSubController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getInterviewMaterialSubs);
router.post('/', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'file', maxCount: 1 }]), addInterviewMaterialSub);
router.put('/:id', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'file', maxCount: 1 }]), updateInterviewMaterialSub);

export default router;