<<<<<<< HEAD
import * as express from 'express';
import upload from '../config/multerConfig';
import {
  createInsightController,
  deleteInsightController,
  updateInsightController,
  getInsightByIdController,
  getAllInsightsController,
  analyzeAndSaveInsight
} from '../controllers/aIInsightController';
=======
import { Router } from "express";
import {
    getAiInsights, getAiInsightsByAnswerId, createInsightController,
    deleteInsightController,
    updateInsightController,
    getInsightByIdController,
    getAllInsightsController,
} from "../controllers/aIInsightController";
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

const router = express.Router();

<<<<<<< HEAD
// נתיבי API בסיסיים
router.get('/', getAllInsightsController);             // שליפת כל התובנות
router.get('/:id', getInsightByIdController);          // שליפת תובנה לפי מזהה
router.post('/', createInsightController);             // יצירת תובנה
router.put('/:id', updateInsightController);           // עדכון תובנה
router.delete('/:id', deleteInsightController);        // מחיקת תובנה
=======
AiInsightsRouter.get('/AiInsights/getAiInsightsByAnswerId/:answerId', getAiInsightsByAnswerId);
AiInsightsRouter.get('/AiInsights/getAiInsights', getAiInsights);
AiInsightsRouter.get('/', getAllInsightsController);
AiInsightsRouter.post('/', createInsightController);            
AiInsightsRouter.get('/:id', getInsightByIdController);         
AiInsightsRouter.put('/:id', updateInsightController);           
AiInsightsRouter.delete('/:id', deleteInsightController);        
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

// נתיב להעלאת קובץ אודיו וניתוח
router.post('/analyze', 
  (req, res, next) => {
    console.log('🎯 Initial middleware - Request reached /analyze route');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body before multer:', req.body);
    next();
  },
  upload.single('audio'),
  (req, res, next) => {
    console.log('📁 After multer middleware');
    console.log('Request body after multer:', req.body);
    console.log('File details:', req.file);
    
    if (!req.file) {
      console.error('❌ No file received');
      return res.status(400).json({ error: 'No file received' });
    }
    
    console.log('✅ File received successfully, proceeding to analysis');
    next();
  },
  (req, res) => {
    console.log('🔍 Starting analyze controller');
    analyzeAndSaveInsight(req, res);
  }
);

export default router;