import express, { Application } from 'express';
import cors from 'cors';

import resourceRouts from '../backend/src/routes/resourceRouts'
import dotenv from 'dotenv';
import answerRoutes from "../backend/src/routes/answerRouts";
import statusRouts from './src/routes/statusRouts';
import categoryRoutes from "./src/routes/categoryRouts";
import aIInsightRouts from './src/routes/aIInsightRouts';

import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
// import {supabase} from './src/config/dbConnection';

import useDynamicContentRouter from './src/routes/dynamicContentRoutes'; // ודאי שזה שם הקובץ המדויק
import aiInsightRoutes from './src/routes/aIInsightRouts';
import userAdminRouts from './src/routes/userAdminRouts';
import interviewMaterialsRoutes from './src/routes/interviewMaterialsRoutes';
import profileRoutes from './src/routes/profileRouts';
import publicProfileRoutes from './src/routes/publicProfileRoutes';

dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGIN?.split(",") ?? [
  "http://localhost:3000",
  "http://localhost:5000",
]);
console.log("Allowed CORS origins:", allowedOrigins);

const normalize = (url: string) => url.replace(/\/+$/, ""); // מסיר / מיותר בסוף

dotenv.config();
import "reflect-metadata";
import questionRoutes from './src/routes/questionRoutes';
import statusRoutes from '../backend/src/routes/statusRouts';

const app: Application = express();
console.log('i am here in app');

app.use(express.json());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', resourceRouts);
app.use(cookieParser());
app.use('/api/categories', categoryRoutes)
app.use('/api', resourceRouts);

app.use('/question', questionRoute);
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/auth', authRouts);
app.use('/interview-materials-hub', interviewMaterialsRoutes);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
// app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);

app.use('/api/simulation', questionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/answers', answerRoutes);

app.use('/api/status', statusRouts);
app.use('/api/categories', categoryRoutes)

app.use('/api/insights', aIInsightRouts);

app.use('/api/dynamic-contents', useDynamicContentRouter);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);
app.use("/manager/interview-materials", interviewMaterialsRoutes);
app.use("/profiles", profileRoutes);
app.use('/public-profile', publicProfileRoutes);
export default app;

