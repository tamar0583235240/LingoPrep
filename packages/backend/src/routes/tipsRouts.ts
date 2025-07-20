import { Router } from 'express';
import { addTip, adminTipController, updateTipController, deleteTipController } from '../controllers/tipsController';


const router = Router();


router.post('/addTip', addTip);
router.get('/', adminTipController );
router.put('/updateTip', updateTipController);
router.patch('/deleteTipById/:tip_id', deleteTipController);

export default router;
