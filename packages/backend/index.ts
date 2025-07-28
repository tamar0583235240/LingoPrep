
import dotenv from 'dotenv';
import app from './app';
import {scheduleReminders} from '../backend/src/jobs/reminderJob'

dotenv.config();
scheduleReminders();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


