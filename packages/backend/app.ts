import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors'
import questionRouter from './src/routes/questionRouts';
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
const redis = require('redis');

dotenv.config();

const subscriber = redis.createClient({
  host: 'host.docker.internal',
  port: 6379
});

export const publisher = redis.createClient({
  host: 'host.docker.internal',
  port: 6379
});

export const sendIo = (io:Server) =>  io;

const createApp = async (port:any): Promise<Application> => {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001'
    ], credentials: true,
  }));

  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', feedbackRouter);
  app.use('/api', AiInsightsRouter);
  app.use('/api', sharedRecrdingRouter);
  app.use('/answers', answerRouter);
  app.use('/question', questionRouter);
  app.use('/users', userRouts);
  app.use('/auth', authRouts);
  app.use('/interview-materials-hub', interviewMaterialsHub);

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:3001'
      ],
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
      console.log(`Received: ${message}`);
      socket.emit('message', `Server received: ${message}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(port, () => {
    console.log('listening on *+ ' + port);
  });
  sendIo(io);
  try {
    if (!subscriber.isOpen)
      await subscriber.connect();

    await subscriber.subscribe('questions', (message: string) => {
      try {
        const newQuestionsList = JSON.parse(message);
        console.log('Received message from Redis:', newQuestionsList);
        io.emit('questionDeleted', newQuestionsList);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
  } catch (error) {
    console.error('Error connecting to Subscriber:', error);
  }

  const shutdown = async () => {
    try {
      if (subscriber.isOpen) {
        await subscriber.quit();
        console.log('Subscriber connection closed');
      }
      if (publisher.isOpen) {
        await publisher.quit();
        console.log('Publisher connection closed');
      }
    } catch (error) {
      console.error('Error closing Redis connections:', error);
    }
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return app;
};
export { createApp };





