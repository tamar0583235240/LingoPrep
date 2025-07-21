import express, { Application } from 'express';
import cors from 'cors';
<<<<<<< HEAD
import resourceRouts from '../backend/src/routes/resourceRouts'
import dotenv from 'dotenv';
import answerRoutes from "../backend/src/routes/answerRouts";
import statusRouts from './src/routes/statusRouts';
import categoryRoutes from "./src/routes/categoryRouts";
import aIInsightRouts from './src/routes/aIInsightRouts';

=======
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
import resourceRouts from '../backend/src/routes/resourceRouts'
import questionRoutes from './src/routes/questionRouts';
import statusRoutes from '../backend/src/routes/statusRoutes';
import useDynamicContentRouter from './src/routes/dynamicContentRoutes'; // ודאי שזה שם הקובץ המדויק
import answerRoutes from './src/routes/answerRouts';
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
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

dotenv.config();
import "reflect-metadata";
import questionRoutes from './src/routes/questionRoutes';
import statusRoutes from '../backend/src/routes/statusRouts';

const app: Application = express();
console.log('i am here in app');

app.use(express.json());
<<<<<<< HEAD

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', resourceRouts);
=======
app.use(cookieParser());
app.use('/api/categories', categoryRoutes)
app.use('/api', resourceRouts);
app.use('/api', feedbackRouter)
app.use('/api', AiInsightsRouter)
app.use('/api', sharedRecrdingRouter)
app.use('/answers', answerRouter);
app.use('/question', questionRoute);
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/auth', authRouts);
app.use('/interview-materials-hub', interviewMaterialsRoutes);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
// app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);


>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
app.use('/api/simulation', questionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/answers', answerRoutes);


app.use('/api/status', statusRouts);
<<<<<<< HEAD
app.use('/api/categories', categoryRoutes)
app.use('/api/insights',aIInsightRouts) ;


export default app;




=======
app.use('/api/insights', aIInsightRouts);

app.use('/api/dynamic-contents', useDynamicContentRouter);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);
app.use("/manager/interview-materials", interviewMaterialsRoutes);
app.use("/profiles", profileRoutes);
app.use('/public-profile', publicProfileRoutes);
export default app;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
