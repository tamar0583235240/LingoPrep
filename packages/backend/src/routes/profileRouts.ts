import { Router } from "express";
import {
  getAllProfilesHandler,
  getProfileByUserIdHandler,
  updateProfileByUserIdHandler,
} from "../controllers/profileController";
import { upload } from "../config/multer";
const router = Router();
router.get("/", getAllProfilesHandler);
router.get("/user/:userId", getProfileByUserIdHandler);
router.put("/user/:userId", upload.single('image'), updateProfileByUserIdHandler);
export default router;