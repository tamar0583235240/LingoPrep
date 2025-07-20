<<<<<<< HEAD
import express, { Application } from 'express';
import cors from 'cors';
import resourceRouts from '../backend/src/routes/resourceRouts'
import dotenv from 'dotenv';
import answerRoutes from "../backend/src/routes/answerRouts";
import statusRouts from './src/routes/statusRouts';
import categoryRoutes from "./src/routes/categoryRouts";
import aIInsightRouts from './src/routes/aIInsightRouts';

=======
import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
import useDynamicContentRouter from './src/routes/dynamicContentRoutes'; // ודאי שזה שם הקובץ המדויק
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';
import userAdminRouts from './src/routes/userAdminRouts';
import interviewMaterialsRoutes from './src/routes/interviewMaterialsRoutes';
import profileRoutes from './src/routes/profileRouts'; 
import publicProfileRoutes from './src/routes/publicProfileRoutes';
>>>>>>> d4bd717e771642befbf637205599dcde848ed652

dotenv.config();
import "reflect-metadata";
import questionRoutes from './src/routes/questionRoutes';
import statusRoutes from '../backend/src/routes/statusRouts';

const allowedOrigins = (process.env.CORS_ORIGIN?.split(",") ?? [
  "http://localhost:3000",
  "http://localhost:5000",
]);
console.log("Allowed CORS origins:", allowedOrigins);

const normalize = (url: string) => url.replace(/\/+$/, ""); // מסיר / מיותר בסוף

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
dotenv.config();
const app: Application = express();
<<<<<<< HEAD
console.log('i am here in app');

app.use(express.json());

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', resourceRouts);
app.use('/api/simulation', questionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/answers', answerRoutes);


app.use('/api/status', statusRouts);
app.use('/api/categories', categoryRoutes)
app.use('/api/insights',aIInsightRouts) ;


=======



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
app.use('/interview-materials-hub', interviewMaterialsRoutes);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
app.use('/api/dynamic-contents', useDynamicContentRouter);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);
app.use("/manager/interview-materials", interviewMaterialsRoutes);
app.use("/profiles", profileRoutes);
app.use('/public-profile', publicProfileRoutes);
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
export default app;
