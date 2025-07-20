import e, { Router } from "express";
import {
  getPublicProfileBySlugHandler,
} from "../controllers/publicProfileController";
const router = Router();


router.get("/:slug", getPublicProfileBySlugHandler);

export default router;