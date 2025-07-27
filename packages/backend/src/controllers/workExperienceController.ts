import { Request, Response } from 'express';
import * as workExperienceRepository from '../reposioty/workExperienceRepository';
import { WorkExperiences } from '../interfaces/entities/WorkExperiences';
import { v4 as uuidv4 } from 'uuid';

export const getAllWorkExperiences = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id as string;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const experiences = await workExperienceRepository.getWorkExperiencesByUserId(userId);
    if (!experiences || experiences.length === 0) {
      return res.status(404).json({ message: 'No work experiences found' });
    }

    res.json(experiences);
  } catch (error) {
    console.error("Error fetching work experiences:", error);
    res.status(500).json({ message: "Failed to fetch work experiences" });
  }
};

export const createWorkExperience = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      companyName,
      position,
      description,
      startDate,
      endDate,
      isPublic
    } = req.body;

    if (!user_id || !companyName || !position || !startDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newExperience: Partial<WorkExperiences> = {
      id: uuidv4(),
      companyName,
      position,
      description,
      startDate,
      endDate: endDate || null,
      isPublic: isPublic ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: { id: user_id } as any, // TypeORM יקשר אוטומטית את ה־user לפי ה־id
    };

    const created = await workExperienceRepository.createWorkExperience(newExperience);
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating work experience:", error);
    res.status(500).json({ message: "Failed to create work experience" });
  }
};

export const updateWorkExperience = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data: Partial<WorkExperiences> = req.body;

     console.log(`Received update for work experience ID: ${id}`);
    console.log("Update data:", data);
    
    const updated = await workExperienceRepository.updateWorkExperience(id, data);
    if (!updated) {
            console.warn(`Work experience with ID ${id} not found`);
      return res.status(404).json({ message: "Work experience not found" });
    }
    console.log("Updated work experience:", updated);

    res.json(updated);
  } catch (error) {
    console.error("Error updating work experience:", error);
    res.status(500).json({ message: "Failed to update work experience" });
  }
};

export const deleteWorkExperience = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await workExperienceRepository.deleteWorkExperience(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting work experience:", error);
    res.status(500).json({ message: "Failed to delete work experience" });
  }
};