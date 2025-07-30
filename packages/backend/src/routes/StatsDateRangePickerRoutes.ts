import { Router } from 'express';
import { recordMetric, getStatsInRange } from '../controllers/StatsDateRangePickerController';

const router = Router();

router.get("/", (req, res) => {
res.json({ message: "API ניטור פעיל" });
});

router.get("/state", getStatsInRange);
router.post("/", recordMetric);

export default router;
