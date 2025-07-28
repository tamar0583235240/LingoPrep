import { Router } from 'express';
import multer from 'multer';
import {
    getInterviewMaterialSub,
    addInterviewMaterialSub,
    updateInterviewMaterialSub,
    deleteInterviewMaterialSub,
} from '../controllers/InterviewMaterialSubController';
import { downloadInterviewMaterial } from '../controllers/downloadController';
import { getInterviewMaterialSubs,searchMterials ,incrementDownloadCount, addFile} from '../controllers/interviewMaterialsHub';

const router = Router();

// הגדרת multer להעלאת קבצים מהזיכרון
const storage = multer.memoryStorage();

const upload = multer({ storage });

 router.get('/download/:id', downloadInterviewMaterial);
router.post('/uploadFile', upload.single('file_url'), addFile);
router.get('/search',searchMterials)
router.patch("/:id", incrementDownloadCount);
 router.delete('/:id', deleteInterviewMaterialSub);
router.post('/',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    addInterviewMaterialSub
)
router.get('/', getInterviewMaterialSubs);

router.put(
    '/:id',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]),
    updateInterviewMaterialSub
);

export default router;


