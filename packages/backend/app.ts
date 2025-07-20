import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';
<<<<<<< HEAD
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
// import {supabase} from './src/config/dbConnection';
import usedynamicContentRouter from './src/routes/DynamicContentRoutes'; // ודאי שזה שם הקובץ המדויק
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';
import userAdminRouts from './src/routes/userAdminRouts';

=======
import remindersRouter from './src/routes/remindersRouts';
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import autoDeleteRoutes from './src/routes/autoDeleteRoutes';
>>>>>>> f459e50e8a6f6d800c0cb3a76c28fffdc787329b
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};
dotenv.config();
const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
<<<<<<< HEAD
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);
app.use('/question', questionRoute); 
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/auth', authRouts);
app.use('/interview-materials-hub', interviewMaterialsHub);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
app.use('/api/dynamic-contents', usedynamicContentRouter);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);
=======
>>>>>>> f459e50e8a6f6d800c0cb3a76c28fffdc787329b

// ראוטרים תחת /api בלבד
app.use('/api/feedback', feedbackRouter);
app.use('/api/ai-insights', AiInsightsRouter);
app.use('/api/shared-recordings', sharedRecrdingRouter);
app.use('/api/answers', answerRouter);
app.use('/api/questions', questionRoute);
app.use('/api/reminders', remindersRouter);
app.use('/api/auth', authRouts);
app.use('/api/interview-materials-hub', interviewMaterialsHub);
app.use('/api/users', userRouts);
app.use('/api/auto-delete', autoDeleteRoutes);
// בדיקה
app.post('/api/test', (req, res) => {
  console.log('>>> BODY RECEIVED:', req.body);
  res.send('ok');
});

console.log('i am here in app');

export default app;
// -----------------------------------------------------------------------

// import express, { Application } from 'express';
// import cors from 'cors';
// import sharedRecordingRouts from './src/routes/sharedRecordingRouts';
// import { supabase } from './src/config/dbConnection';
// const app: Application = express();

// console.log('i am here in app');

// app.use(express.json());
// app.use(cors());



// app.use('/api', sharedRecordingRouts);


// // app.use('api',sharedRecordingRouts.ts)
// export default app;