// <<<<<<< HEAD
import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, uploadUsersExcel } from '../controllers/userController';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
// router.post("/add", createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post("/upload", upload.single("file"), uploadUsersExcel);

export default router;

// =======
// import express from "express";
// import multer from "multer";
// import { getAllUsers, updateUser, deleteUser, createUser, uploadUsersExcel } from "../controllers/userController";

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });  

// router.get("/", getAllUsers);
// router.post("/add", createUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

// router.post("/upload", upload.single("file"), uploadUsersExcel);

// >>>>>>> Activity-Monitoring
