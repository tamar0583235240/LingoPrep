// import express from 'express';
// import { getWeeklyUserStats } from '../controllers/statsController';
// import { authenticateToken } from '../middlewares/authMiddlewares';
// // import { logout } from '../controllers/authController'; // ודא שהנתיב נכון
// import { logout } from "../controllers/authController";

// const router = express.Router();

// router.get('/weekly-stats', authenticateToken, getWeeklyUserStats);
// router.post("/logout", authenticateToken, logout);

// export default router;


// 🛣️ routes/statsRoutes.ts – הגדרת הנתיב החדש
import express from 'express';
import { getUserStats } from '../controllers/statsController';
import { authenticateToken } from '../middlewares/authMiddlewares';

const router = express.Router();

router.get('/stats', authenticateToken, getUserStats);

export default router;
