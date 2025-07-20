// import { Router } from 'express';
// import { exampleMiddleware } from '../middlewares/exampleMiddlewares';
// import { saveUserReminderSettings } from '../controllers/reminderController';

// const router = Router();
// // example for implemantaion
// //router.get('/exampleURL', exampleMiddleware, reminderController);
// // router.post('/reminders/settings', saveUserReminderSettings);

// router.post("/api/reminders/settings", saveUserReminderSettings)

// export default router;


import { Router } from 'express';
import { saveUserReminderSettings, getUserReminderSettings } from '../controllers/reminderController';

const router = Router();

router.get("/reminder-settings/:userId", getUserReminderSettings);
router.post("/reminder-settings", saveUserReminderSettings);

export default router;


