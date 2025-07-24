import { Router } from 'express';
import { recordMetric,getStatsInRange} from '../controllers/activity-Monitoring';

const router = Router();
router.get("/state", getStatsInRange);
router.post('/',recordMetric)

export default router;