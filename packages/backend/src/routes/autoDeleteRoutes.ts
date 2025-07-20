import express from 'express';
import { getAutoDeleteConfigHandler, postAutoDeleteConfigHandler } from '../controllers/DeleteRecordingController';

const router = express.Router();

router.get('/auto-delete-config', getAutoDeleteConfigHandler);
router.post('/auto-delete-config', postAutoDeleteConfigHandler);

export default router;
