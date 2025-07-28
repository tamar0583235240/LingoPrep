// src/repository/userRepository2.ts
import { pool } from "../config/dbConnection";

export async function getUserEmailById(userId: string): Promise<string | null> {
  const { rows } = await pool.query(
    `SELECT email FROM users WHERE id = $1 LIMIT 1`,
    [userId]
  );
  return rows[0]?.email ?? null;
}