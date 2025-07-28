import { Request, Response } from 'express';
import { Users } from '../interfaces/entities/Users';
import userRepository from '../repository/userRepository';
import bcrypt from 'bcrypt';
import { generateUniqueSlug } from '../utils/generateSlug';
import { pool } from '../config/dbConnection';
import { v4 as uuidv4 } from 'uuid';
import { createUserByAdminSchema , updateUserByAdminSchema  } from '../validations/userValidations';
import  insertUsersFromExcel  from '../repository/userRpository';

const SALT_ROUNDS = 10;

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.getAllUsers();
  if (!users || users.length === 0) {
    return res.status(404).json({ message: 'No users found' });
  }
  res.json(users);
};

function mapUserRowToCamelCase(row: any) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    password: row.password,
    createdAt: row.created_at,
    isActive: row.is_active,
  };
}
export const getAllUsersByAdmin = async (req: Request, res: Response) => {
  const { isActive, search, startDate, endDate } = req.query;

  let baseQuery = 'SELECT * FROM users';
  const conditions: string[] = [];
  const values: any[] = [];

  if (isActive === 'true') {
    conditions.push('is_active = true');
  } else if (isActive === 'false') {
    conditions.push('is_active = false');
  }

  if (typeof search === 'string' && search.trim() !== '') {
    values.push(`%${search.trim()}%`);
    conditions.push(`(first_name ILIKE $${values.length} OR last_name ILIKE $${values.length})`);
  }



  if (conditions.length > 0) {
    baseQuery += ' WHERE ' + conditions.join(' AND ');
  }

  try {
    const result = await pool.query(baseQuery, values);
    const users = result.rows.map(mapUserRowToCamelCase);
    res.status(200).json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
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
    firstName: first_name,
    lastName: last_name,
    slug,
    email,
    phone,
    password: hashedPassword,
    role: role || 'student',
    createdAt: new Date(),
    isActive: true,
    answers: [],
    feedbacks: [],
     feedbacktypes: [],  
    passwordResetTokens: [],
    sharedRecordings: [],
    contentReports: [],
    experienceThanks: [],
     resources: [],  
    interviewExperiences: [],
    userReminderSettings: [],
    userSessions: [],
    userActivities: [],
    workExperiences: [],
    profiles: {
      id: uuidv4(),
      userId: '',
      imageUrl: null,
      location: null,
      externalLinks: null,
      status: null,
      preferredJobType: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
      user: {} as Users 
      
    }

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

  if (userData.firstName || userData.lastName) {
    const slug = await generateUniqueSlug(userData.firstName || '', userData.lastName || '');
   
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

export const createUserByAdmin = async (req: Request, res: Response) => {
  try {

    await createUserByAdminSchema.validate(req.body, { abortEarly: false });

    const { firstName, lastName, email, phone, role, password } = req.body;

 
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'שדות חובה חסרים' });
    }

    
    const checkEmail = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if ((checkEmail.rowCount ?? 0) > 0) {
  return res.status(400).json({ error: 'אימייל זה כבר קיים במערכת' });
}



    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

   
    const id = uuidv4();
    const createdAt = new Date();

 
    const result = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true, $8)
       RETURNING *`,
      [id, firstName, lastName, email, phone, role || 'student', createdAt, hashedPassword]
    );

 
    res.status(201).json(mapUserRowToCamelCase(result.rows[0]));
  } catch (error: any) {
    console.error('Create user error:', error);

    if (error.code === '23505' && error.constraint === 'users_email_key') {
      return res.status(400).json({ error: 'אימייל זה כבר קיים במערכת' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ error: 'שגיאת שרת – יצירת משתמש נכשלה' });
  }
};

export const updateUserByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, role, password } = req.body;

  try {
    await updateUserByAdminSchema.validate(req.body, { abortEarly: false });

    const emailCheck = await pool.query(
      `SELECT id FROM users WHERE email = $1 AND id != $2`,
      [email, id]
    );
    if (emailCheck.rowCount && emailCheck.rowCount > 0) {
      return res.status(400).json({ error: 'אימייל זה כבר קיים במערכת' });
    }

    const hashedPassword = password || null;

    const result = await pool.query(
      `UPDATE users SET
        first_name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        role = $5,
        password = COALESCE($6, password)
       WHERE id = $7
       RETURNING *`,
      [firstName, lastName, email, phone, role, hashedPassword, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(mapUserRowToCamelCase(result.rows[0]));
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};


export const deleteUserByAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};


export const uploadUsersExcel = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('לא נשלח קובץ');
    }

    const { insertedUsers, skippedUsers } = await userRepository.insertUsersFromExcel(req.file.path);

    res.status(200).json({
      message: 'עיבוד הקובץ הסתיים',
      successCount: insertedUsers.length,
      skippedCount: skippedUsers.length,
      skippedUsers: skippedUsers.map(({ email, reason }) => ({ email, reason })),
    });
  } catch (error) {
    console.error('Excel upload error:', error);
    res.status(500).json({ error: 'שגיאה בעת עיבוד הקובץ' });
  }
};

