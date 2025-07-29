
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
// import {supabase} from './src/config/dbConnection';
import statusRouts from './src/routes/statusRoutes';
import categoryRoutes from "./src/routes/categoryRoutes";
import aIInsightRouts from './src/routes/aIInsightRouts';
import questionRoutes from './src/routes/questionRouts';
import statusRoutes from '../backend/src/routes/statusRoutes';
import useDynamicContentRouter from './src/routes/dynamicContentRoutes'; // ודאי שזה שם הקובץ המדויק
import resourceRouts from './src/routes/resourceRouts';
import usersRoutes from './src/routes/userRouts';
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';
import userAdminRouts from './src/routes/userAdminRouts';
import interviewMaterialsRoutes from './src/routes/interviewMaterialsRoutes';
import profileRoutes from './src/routes/profileRouts';
import publicProfileRoutes from './src/routes/publicProfileRoutes';
import feedbackRouter from './src/routes/feedbackRouts';
import codeQuestionsRouts from './src/routes/codeQuestionsRouts';
dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGIN?.split(",") ?? [
  "http://localhost:3000",
  "http://localhost:5000",
]);
console.log("Allowed CORS origins:", allowedOrigins);

const normalize = (url: string) => url.replace(/\/+$/, ""); // מסיר / מיותר בסוף


const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};
dotenv.config();
const app: Application = express();
console.log('i am here in app');





app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouts);
app.use('/api/interviewMaterialSub', interviewMaterialsRoutes);
app.use('/api/insights', aIInsightRouts);
app.use('/api/categories', categoryRoutes)
app.use('/answers', answerRouter);
app.use('/question', questionRoute);
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
app.use("/api/aiInsight", aiInsightRoutes);
app.use('/api/simulation', questionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/status', statusRouts);
app.use('/api/dynamic-contents', useDynamicContentRouter);

app.use('/api/resources', resourceRouts);
// רישום הראוטים
app.use("/api/users", usersRoutes);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);

// app.use("/manager/interview-materials", interviewMaterialsRoutes);
app.use("/profiles", profileRoutes);
app.use('/public-profile', publicProfileRoutes);
app.use('/api/codeQuestions', codeQuestionsRouts);
app.use('/api', resourceRouts);
app.use('/api', feedbackRouter)
app.use('/api', AiInsightsRouter)
app.use('/api', sharedRecrdingRouter)





export default app;

