import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';
import statsRoutes from './src/routes/statsRoutes';


import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
// import {supabase} from './src/config/dbConnection';
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';
import activity_MonitoringRoutes from './src/routes/activity-MonitoringRoutes'
import { pool } from './src/config/dbConnection';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
dotenv.config();
const app: Application = express();


console.log('✅ i am here in app');

app.use(cors());
app.use(express.json());

// רישום הראוטים
app.use("/api/users", userRouts);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);
app.use("/api/monitoring", activity_MonitoringRoutes);




app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);
app.use('/question', questionRoute); 
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/auth', authRouts);
app.use('/interview-materials-hub', interviewMaterialsHub);
app.use('/stats', statsRoutes);

export default app