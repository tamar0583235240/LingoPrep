import { Router } from 'express';
import { answerController, notificationController } from '../controllers/answerController';
import { getProgressStats } from "../controllers/answerController";


const router = Router();
router.get('/getAllAnswersByIdUser/:user_id' ,answerController);
router.get("/progress/:userId", getProgressStats);

router.post('/certificate', notificationController.handleCertificateNotification);
router.get('/certificate', notificationController.getAllCertificateNotifications);

export default router;
