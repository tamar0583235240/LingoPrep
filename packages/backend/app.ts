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

dotenv.config();
const allowedOrigins = (process.env.CORS_ORIGIN?.split(",") ?? [
  "http://localhost:3000",
  "http://localhost:5000",
]);
console.log("Allowed CORS origins:", allowedOrigins);

const normalize = (url: string) => url.replace(/\/+$/, ""); // מסיר / מיותר בסוף

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log("Raw origin:", origin);
    if (!origin) return callback(null, true);

    const cleanOrigin = normalize(origin);
    const cleanAllowed = allowedOrigins.map(normalize);

    console.log("Clean origin:", cleanOrigin);
    console.log("Allowed origins:", cleanAllowed);

    if (
      cleanOrigin.startsWith("chrome-extension://") ||
      cleanAllowed.includes(cleanOrigin)
    ) {
      return callback(null, true);
    }

    callback(new Error("CORS blocked: Origin not allowed: " + cleanOrigin));
  },
  credentials: true,
};

const app: Application = express();

app.use(cors(corsOptions));
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
export default app;
