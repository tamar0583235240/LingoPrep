import { pool } from '../config/dbConnection';
import { Users } from "../interfaces/entities/Users";
import bcrypt from "bcrypt";

export const login = async (email: string, password: string): Promise<Users | null> => {
  try {
    // שליפת המשתמש
    const res = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
    const user = res.rows[0];
    if (!user) return null;

    // בדיקת סיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // סימון כמשתמש פעיל
    await pool.query('UPDATE users SET is_active = true WHERE id = $1', [user.id]);

    return user as Users;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const signup = async (userData: Users): Promise<Users> => {
  try {
    const { id, first_name, last_name, email, phone, role, createdAt, isActive, password, slug } = userData;

    const res = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active, password, slug)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [id, first_name, last_name, email, phone, role, createdAt, isActive, password, slug]
    );

    return (res.rows[0] as Users) || null;
  } catch (error) {
    console.error("Error creating user in local DB:", error);
    throw error;
  }
};

export const logout = async (userId: string): Promise<void> => {
  try {
    await pool.query('UPDATE users SET is_active = false WHERE id = $1', [userId]);
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export default { login, signup, logout };
