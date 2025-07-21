import { Router } from 'express';
import multer from 'multer'
import { uploadRecording } from '../controllers/resourceController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadRecording);
export default router;
