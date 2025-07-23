import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingRouter from './src/routes/sharedRecordingRouts';
import interviewMaterialsHub from './src/routes/interview-materials-hub';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import usedynamicContentRouter from './src/routes/dynamicContentRoutes';
import userAdminRouts from './src/routes/userAdminRouts';
import popularQuestionsRoute from './src/routes/popularQuestionsRoute';
import exampleRouts from './src/routes/exampleRouts';
import activity_MonitoringRoutes from './src/routes/StatsDateRangePickerRoutes';
// import userStatsRoutes from './src/routes/userStatsRouts';
import userStatsRoutes from './src/routes/stateRoutes';

dotenv.config();

const app: Application = express();

console.log('✅ i am here in app');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// רישום ראוטים
app.use('/api/feedback', feedbackRouter);
// app.use('/api/AiInsights', AiInsightsRouter);
// app.use('/api/aiInsight', AiInsightsRouter); // אם את רוצה שם פשוט ואחיד
app.use('/api/AiInsights', AiInsightsRouter);

app.use('/api/shared-recordings', sharedRecordingRouter);
app.use('/api/answers', answerRouter);
app.use('/api/questions', questionRoute); 
app.use('/api/auth', authRouts);
app.use('/api/interview-materials-hub', interviewMaterialsHub);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
app.use('/api/dynamic-contents', usedynamicContentRouter);
app.use('/api/popular-questions', popularQuestionsRoute); 
app.use('/api/example', exampleRouts);
app.use("/api/monitoringh", activity_MonitoringRoutes);
app.use("/api/activity", activity_MonitoringRoutes);
app.use("/api/monitoring", activity_MonitoringRoutes);
app.use('/api/stats', userStatsRoutes);
app.use('/api/stats', userStatsRoutes);

export default app;
