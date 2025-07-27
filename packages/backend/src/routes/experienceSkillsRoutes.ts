import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkillDetails,
} from "../controllers/expertiseSkillsController";
import { Router } from "express";

const router = Router();

router.get("/:user_id", getSkills);
router.post("/:user_id", createSkill);
router.put("/:user_id/:id/visibility", updateSkillDetails);
router.delete("/:user_id/:id", deleteSkill);

export default router;
