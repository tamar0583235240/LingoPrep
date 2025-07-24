import { getInterviewMaterialSub,updateInterviewMaterialSub,deleteInterviewMaterialSub,addInterviewMaterialSub } from '../controllers/InterviewMaterialSubController';
import { Router } from 'express';
import multer from 'multer'

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getInterviewMaterialSub);
router.post('/', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'file', maxCount: 1 }]), addInterviewMaterialSub);
router.put('/:id', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'file', maxCount: 1 }]), updateInterviewMaterialSub);
router.delete('/:id', deleteInterviewMaterialSub);
export default router;