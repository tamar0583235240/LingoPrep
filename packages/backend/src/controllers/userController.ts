import { Request, Response } from 'express';
import { Users } from '../interfaces/entities/Users';
import userRepository from '../reposioty/userRepository';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { generateUniqueSlug } from '../utils/generateSlug';

const SALT_ROUNDS = 10;

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.getAllUsers();
  if (!users || users.length === 0) {
    return res.status(404).json({ message: 'No users found' });
  }
  res.json(users);
};

export const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await userRepository.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userRepository.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, phone, password, role } = req.body;

  const existing = (await userRepository.getAllUsers()).find((user: Users) => user.email === email);
  if (existing) {
    return res.status(409).json({ message: 'אימייל כבר קיים' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const slug = await generateUniqueSlug(first_name, last_name);

  const newUser: Users = {
    id: uuidv4(),
    first_name,
    last_name,
    email,
    phone,
    password: hashedPassword,
    role: role || 'student',
    createdAt: new Date(),
    isActive: true,
    answers: [],
    feedbacks: [],
    passwordResetTokens: [],
    sharedRecordings: [],
    resources: [],
    userReminderSettings: [],
    slug,
    contentReports: [],
    experienceThanks: [],
    interviewExperiences: [],
    userSessions: [],
    workExperiences: [],
    profiles: null,
  };

  const createdUser = await userRepository.createUser(newUser);
  res.status(201).json(createdUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userData: Partial<Users> = req.body;

  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
  }

  if (userData.first_name || userData.last_name) {
    const slug = await generateUniqueSlug(userData.first_name || '', userData.last_name || '');
    userData.slug = slug;
  }

  const updatedUser: Users | null = await userRepository.updateUser(userId, userData);
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await userRepository.deleteUser(userId);
  res.status(204).send();
};
