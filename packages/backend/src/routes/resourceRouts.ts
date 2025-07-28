// import express from 'express';
// import { getAllRecordingsController } from '../controllers/resourceController';

// const router = express.Router();

// router.get('/', getAllRecordingsController);
// router.post('/uploadRecord', upload.single('file'), uploadRecording);

// export default router;
import express from 'express';
import multer from 'multer';
import {

  uploadRecording
} from '../controllers/resourceController';

const router = express.Router();

const storage = multer.memoryStorage(); // ✅ שומר בזיכרון
const upload = multer({ storage });

// routes
router.get('/', uploadRecording);

router.post('/upload', upload.single('file'), uploadRecording);
export default router;

