import { Request, Response } from "express";
import userRepository from '../reposioty/userRepository';
import {
  getUserExpertiseSkills, addExpertiseSkill, deleteExpertiseSkill,
  updateSkillDetail
} from '../reposioty/expertiseSkillsRepository';
import { get } from "http";
export const getSkills = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    if (!user_id) return res.status(401).json({ message: "Unauthorized" });
    const skills = await getUserExpertiseSkills(user_id);
    res.json(skills);
  } catch (error) {
    console.error("Error getting skills:", error);
    res.status(500).json({ message: "שגיאה בשליפת המיומנויות" });
  }
};
export const createSkill = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { category, name, level } = req.body;
    if (!user_id || !category || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const skill = await addExpertiseSkill(user_id, category, name, level);
    res.status(201).json(skill);
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ message: "שגיאה ביצירת המיומנות" });
  }
};
export const updateSkillDetails = async (req: Request, res: Response) => {
  try {
    const { user_id, id } = req.params;
    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const skill = req.body; // should include category, name, level
    const updated = await updateSkillDetail(Number(id), {
      ...skill,
      user_id
    });
    res.json(updated);
  } catch (error) {
    console.error("Error updating skill details:", error);
    res.status(500).json({ message: "שגיאה בעדכון המיומנות" });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { user_id, id } = req.params;
    if (!user_id || !id) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const deleted = await deleteExpertiseSkill(Number(id), user_id);
    if (!deleted) {
      return res.status(404).json({ message: "Skill not found or not authorized to delete" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: "שגיאה במחיקת המיומנות" });
  }
};