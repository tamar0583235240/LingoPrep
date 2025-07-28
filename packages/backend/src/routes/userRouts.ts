import express from "express";
import multer from "multer";
import { getAllUsers, getUserById,updateUser, deleteUser, createUser } from "../controllers/userController";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  

router.get("/", getAllUsers);
router.get('/:id', getUserById);
router.post("/add", createUser);
router.post('/', createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// router.post("/upload", upload.single("file"), uploadUsersExcel);

export default router;
