import * as dotenv from 'dotenv';
dotenv.config();

import express = require('express');
import { Application } from 'express';
import cors = require('cors');
import path = require('path');
import aiInsightRoutes from './routes/aiInsightRoutes';

const app: Application = express();

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
  credentials: true,
  exposedHeaders: ['Content-Length', 'Content-Type']
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register only AI insight routes for testing
console.log('🔗 Registering AI insight routes...');
app.use('/api/ai-insights', aiInsightRoutes);

// הגדרת תיקיית uploads כתיקייה סטטית
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Debug middleware for all routes
app.use((req, res, next) => {
  console.log('🎯 Route hit:', {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers
  });
  next();
});

// נתיב בדיקה
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route works');
});

// נתיב בדיקה ל-analyze
app.post('/api/ai-insights/analyze/test', (req, res) => {
  console.log('Test analyze route hit');
  res.json({ status: 'ok', message: 'analyze route is working!' });
});

export default app;

