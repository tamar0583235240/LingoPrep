
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
import remindersRouts from './src/routes/remindersRouts';
// import remindersRouter from './src/routes/remindersRouts';

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
app.use('/api/reminders', remindersRouts);


app.use('/api' ,feedbackRouts )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);

app.use('/question', questionRoute); 
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/auth', authRouts);
app.use('/api', autoDeleteRoutes);

export default app