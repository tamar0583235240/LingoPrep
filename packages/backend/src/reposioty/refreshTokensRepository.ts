import { pool } from "../config/dbConnection";

const createToken = async (userId: string, token: string, expiresAt: Date) => {
    await pool.query(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [userId, token, expiresAt]
    );
};

const getToken = async (user_id: string, token: string) => {
    const result = await pool.query(
        'SELECT * FROM refresh_tokens WHERE user_id = $1 AND token = $2 LIMIT 1',
        [user_id, token]
    );
    return result.rows[0] || null;
};

const refreshToken = async (oldToken: string, newToken: string, expiresAt: Date) => {
    const result = await pool.query(
        'UPDATE refresh_tokens SET token = $1, expires_at = $2 WHERE token = $3 ',
        [newToken, expiresAt, oldToken]
    );
    return result.rows[0] || null;
}

const deleteToken = async (token: string) => {
    await pool.query(
        'UPDATE refresh_tokens SET is_valid = false WHERE token = $1',
        [token]
    );
}

export default {
    createToken,
    getToken,
    refreshToken,
    deleteToken
};