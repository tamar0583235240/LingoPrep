import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors';
import questionRouter from './src/routes/questionRouts';
import interviewExperiencesRouter from './src/routes/interviewExperiencesRouts';
import experienceThanksRouter from './src/routes/experienceThanksRouts';
import contentReportsRouter from './src/routes/contentReportsRouts';
// import exampleRouts from './src/routes/exampleRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';



import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
// import {supabase} from './src/config/dbConnection';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
dotenv.config();
const app: Application = express();



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
app.use('/interviewExperiences', interviewExperiencesRouter);
app.use('/interview-materials-hub', interviewMaterialsHub);
app.use('/experienceThanks', experienceThanksRouter);
app.use('/contentReports', contentReportsRouter);
app.use('/interview-materials-hub', interviewMaterialsHub);

export default app
