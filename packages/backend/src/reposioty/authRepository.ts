import { pool } from '../config/dbConnection';
import { Users } from "../interfaces/entities/Users";
import bcrypt from "bcrypt";

export const login = async (email: string, password: string): Promise<Users | null> => {
  try {
    const res = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
    const user = res.rows[0];
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

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
    const { id, firstName, lastName, email, phone, role, createdAt, isActive, password } = userData;

    // ודא שהסיסמה מוצפנת לפני שליחה לפונקציה זו

    const res = await pool.query(
      `INSERT INTO users (id, first_name, last_name, email, phone, role, created_at, is_active, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id, firstName, lastName, email, phone, role, createdAt, isActive, password]
    );

    return res.rows[0] as Users;
  } catch (error) {
    console.error("Error creating user in DB:", error);
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
