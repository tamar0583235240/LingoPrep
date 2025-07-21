import { Router } from 'express';
import multer from 'multer';
import {
    getInterviewMaterialSub,
    addInterviewMaterialSub,
    updateInterviewMaterialSub,
    deleteInterviewMaterialSub,
} from '../controllers/InterviewMaterialSubController';
import { downloadInterviewMaterial } from '../controllers/downloadController';

const router = Router();

// הגדרת multer להעלאת קבצים מהזיכרון
const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get('/', getInterviewMaterialSub);
router.delete('/:id', deleteInterviewMaterialSub);
router.post('/',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    addInterviewMaterialSub
)
router.put(
    '/:id',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    updateInterviewMaterialSub
);
router.get('/download/:id', downloadInterviewMaterial);

export default router;

