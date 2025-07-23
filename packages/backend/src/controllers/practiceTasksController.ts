import { Request, Response } from 'express';
import * as practiceTaskRepo from '../reposioty/practiceTasksRepository';
import { PracticeTasks } from '../interfaces/entities/PracticeTasks';
import { v4 as uuidv4 } from 'uuid';

export const getPracticeTasks = async (req: Request, res: Response) => {
  try {
    const { user_id, from, to } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    const tasks = await practiceTaskRepo.getPracticeTasksByUserId(
      user_id as string,
      from as string,
      to as string
    );

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching practice tasks:', error);
    res.status(500).json({ message: 'Failed to fetch practice tasks' });
  }
};

export const getPracticeTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await practiceTaskRepo.getPracticeTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Practice task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    res.status(500).json({ message: 'Failed to fetch practice task' });
  }
};



export const createPracticeTask = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      title,
      description,
      start_datetime,
      duration_minutes,
      category,
      reminder_minutes_before,
    } = req.body;

    if (!user_id || !title || !start_datetime || !duration_minutes || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newTask: Partial<PracticeTasks> = {
      id: uuidv4(),
      userId: user_id,
      title,
      description,
      startDatetime: new Date(start_datetime),
      durationMinutes: duration_minutes,
      category,
      reminderMinutesBefore: reminder_minutes_before,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const created = await practiceTaskRepo.createPracticeTask(newTask);
    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating practice task:', error);
    res.status(500).json({ message: 'Failed to create practice task' });
  }
};

export const updatePracticeTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data: Partial<PracticeTasks> = req.body;

    const updated = await practiceTaskRepo.updatePracticeTask(id, data);
    if (!updated) {
      return res.status(404).json({ message: 'Practice task not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating practice task:', error);
    res.status(500).json({ message: 'Failed to update practice task' });
  }
};

export const deletePracticeTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await practiceTaskRepo.deletePracticeTask(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting practice task:', error);
    res.status(500).json({ message: 'Failed to delete practice task' });
  }
};
