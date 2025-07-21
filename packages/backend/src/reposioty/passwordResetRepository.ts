import { pool } from "../config/dbConnection";

export const createToken = async (userId: string, token: string, expiresAt: Date) => {
    await pool.query(
        'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [userId, token, expiresAt]
    );
};
export const getToken = async (token: string) => {
    const result = await pool.query(
        'SELECT * FROM password_reset_tokens WHERE token = $1 LIMIT 1',
        [token]
    );
    return result.rows[0] || null;
};
export const deleteToken = async (token: string) => {
    await pool.query(
        'DELETE FROM password_reset_tokens WHERE token = $1',
        [token]
    );
};
