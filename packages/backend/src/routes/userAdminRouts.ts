import express from 'express';
import multer from 'multer';
import {
  getAllUsersByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
  createUserByAdmin,
  uploadUsersExcel ,
} from '../controllers/userController';

const router = express.Router();

// הגדרת multer
const upload = multer({ dest: 'uploads/' });

// עדיף לשנות prefix לנתיבי admin, למשל /admin, כדי למנוע כפילויות והתנגשויות
router.get('/', getAllUsersByAdmin);
router.post('/add', createUserByAdmin);
router.put('/:id', updateUserByAdmin);
router.delete('/:id', deleteUserByAdmin);
router.post('/upload', upload.single('file'), uploadUsersExcel );

export default router;
