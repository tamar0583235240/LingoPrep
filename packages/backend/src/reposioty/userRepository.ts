import { pool } from "../config/dbConnection";
import { Users } from "../interfaces/entities/Users";
import { User } from "../interfaces/User";
import bcrypt from "bcrypt";

import xlsx from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { createUserByAdminSchema } from "../validations/userValidations";

const SALT_ROUNDS = 10;

// קבלת משתמש לפי אימייל בלבד
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    return result.rows[0] || null;
  } catch {
    throw new Error("User not found");
  }
};

// קבלת כל המשתמשים
const getAllUsers = async (): Promise<Users[]> => {
  try {
    const res = await pool.query("SELECT * FROM users");
    return res.rows as Users[];
  } catch (error) {
    console.error("Error fetching users from local DB:", error);
    throw error;
  }
};

// קבלת משתמש לפי מזהה
const getUserById = async (id: string): Promise<Users | null> => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error fetching user by ID from local DB:", error);
    throw error;
  }
};

// קבלת משתמש לפי אימייל וסיסמה
export const getUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    return user;
  } catch {
    throw new Error("User not found");
  }
};

// עדכון סיסמה (עם הצפנה)
export const updateUserPassword = async (
  userId: string,
  newPassword: string
) => {
  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
    hashedPassword,
    userId,
  ]);
};

// עדכון פרטי משתמש (כולל הצפנת סיסמה במידת הצורך)
const updateUser = async (
  id: string,
  userData: Partial<Users>
): Promise<Users | null> => {
  try {
    const { firstName, lastName, email, phone, role, isActive, password } =
      userData;

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const res = await pool.query(
      `
        UPDATE users 
        SET first_name = $1, last_name = $2, email = $3, phone = $4, role = $5, is_active = $6, password = COALESCE($7, password)
        WHERE id = $8 RETURNING *
      `,
      [firstName, lastName, email, phone, role, isActive, hashedPassword, id]
    );
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error updating user in local DB:", error);
    throw error;
  }
};

// הפיכת משתמש לפעיל
const updateActiveUser = async (id: string): Promise<Users | null> => {
  try {
    const res = await pool.query(
      `
        UPDATE users 
        SET is_active = true
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error updating user in local DB:", error);
    throw error;
  }
};

// יצירת משתמש חדש (עם הצפנת סיסמה)
const createUser = async (user: Users): Promise<Users> => {
  try {
    if (!user.password) {
      throw new Error("Password is required to create a user");
    }
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

    const res = await pool.query(
      `
        INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active, password)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), $6, $7)
        RETURNING *
      `,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.phone,
        user.role,
        user.isActive ?? true,
        hashedPassword,
      ]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating user in local DB:", error);
    throw error;
  }
};

const insertUser = async (user: {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: boolean;
  password: string;
  created_at: Date;
}) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  const result = await pool.query(
    `
      INSERT INTO users (id, first_name, last_name, email, phone, role, is_active, password, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
    [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.phone,
      user.role,
      user.is_active,
      hashedPassword,
      user.created_at,
    ]
  );
  return result.rows[0];
};

// מחיקת משתמש
const deleteUser = async (id: string): Promise<void> => {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting user from local DB:", error);
    throw error;
  }
};

interface ExcelUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  reason?: string;
}

// הוספת משתמשים מקובץ אקסל עם ולידציה והצפנת סיסמאות
export const insertUsersFromExcel = async (
  filePath: string
): Promise<{
  insertedUsers: ExcelUser[];
  skippedUsers: ExcelUser[];
}> => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: ExcelUser[] = xlsx.utils.sheet_to_json(sheet);

  const insertedUsers: ExcelUser[] = [];
  const skippedUsers: ExcelUser[] = [];

  for (const user of data) {
    const { email } = user;

    // בדיקת אימייל כפול במסד
    const emailCheck = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (emailCheck.rowCount && emailCheck.rowCount > 0) {
      skippedUsers.push({ ...user, reason: "אימייל כבר קיים במערכת" });
      continue;
    }

    // בדיקת ולידציה לפי createUserByAdminSchema
    try {
      await createUserByAdminSchema.validateAsync(user, { abortEarly: false });
    } catch (validationError: any) {
      const errorMessages = validationError.details
        ?.map((e: any) => e.message)
        .join(", ");
      skippedUsers.push({ ...user, reason: errorMessages || "ולידציה נכשלה" });
      continue;
    }

    const id = uuidv4();
    const createdAt = new Date();
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

    await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, password, created_at, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)`,
      [
        id,
        user.firstName,
        user.lastName,
        user.email,
        user.phone,
        user.role,
        hashedPassword,
        createdAt,
      ]
    );

    insertedUsers.push(user);
  }

  return { insertedUsers, skippedUsers };
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmailAndPassword,
  getUserByEmail,
  updateUserPassword,
  updateUser,
  updateActiveUser,
  createUser,
  insertUser,
  deleteUser,
  insertUsersFromExcel,
};
