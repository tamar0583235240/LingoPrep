
import express, { Application } from 'express';
import cors from 'cors';

import feedbackRouts from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import autoDeleteRoutes from './src/routes/autoDeleteRoutes';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';



import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
// import remindersRouts from './src/routes/remindersRouts';
// import remindersRouter from './src/routes/remindersRouts';
// import remindersroutes from './src/routes/remindersRoutes';
import remindersRoutes from './src/routes/remindersRoutes';
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};
dotenv.config();
const app: Application = express();
console.log("📁 loaded autoDeleteRoutes.ts");
console.log("🔔 Starting server with CORS options:", corsOptions);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
console.log("🚦 טוען ראוט reminders לפני הקישור ל-express...");
app.use('/api/reminders', remindersRoutes);


app.use('/api' ,feedbackRouts )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);

app.use('/question', questionRoute); 
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/auth', authRouts);
app.use('/api', autoDeleteRoutes);

export default app