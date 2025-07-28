import { pool } from "../config/dbConnection";

export const refreshTokenRepository = {
  async getByToken(token: string) {
    return pool.query("SELECT * FROM password_reset_tokens WHERE token = $1", [token]).then(r => r.rows[0]);
  },

  async deleteByToken(token: string) {
    return pool.query("DELETE FROM password_reset_tokens WHERE token = $1", [token]);
  },

  async deleteByUserId(userId: string) {
    return pool.query("DELETE FROM password_reset_tokens WHERE user_id = $1", [userId]);
  },

  async save({ userId, token, expires_at }: { userId: string, token: string, expires_at: Date }) {
    return pool.query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [userId, token, expires_at]
    );
  },
};