import { pool } from '../config/dbConnection';
import { Users } from "../interfaces/entities/Users";
import bcrypt from "bcrypt";

export const login = async (email: string, password: string): Promise<Users | null> => {
  try {
    // Retrieving the user
    const res = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
    const user = res.rows[0];
    if (!user) return null;

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // Mark as active user
    await pool.query('UPDATE users SET is_active = true WHERE id = $1', [user.id]);

    // מחזיר את המשתמש ללא שדה הסיסמה
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as Users;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const signup = async (userData: Users): Promise<Users> => {
  try {
    const { id, firstName, lastName, email, phone, role, createdAt, isActive, password, slug } = userData;

    const res = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active, password, slug)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [id, firstName, lastName, email, phone, role, createdAt, isActive, password, slug]
    );

    return res.rows[0] as Users;
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
