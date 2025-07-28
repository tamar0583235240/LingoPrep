// import { Pool } from 'pg';
import { pool } from '../config/dbConnection';

// מחיקת הקלטות ישנות לפי תאריך
export const deleteOldRecordings = async (dateBefore: Date): Promise<number> => {
  const result = await pool.query(
    `DELETE FROM answers WHERE submitted_at  < $1`,
    [dateBefore]
  );
  return result.rowCount ?? 0;  // מחזיר 0 אם rowCount הוא null או undefined
};


// הכנסת או עדכון הגדרת מחיקה אוטומטית
export const upsertAutoDeleteConfig = async (
  is_enabled: boolean,
  retention_days: number
) => {
  try {
const query = `
  INSERT INTO auto_delete_config (id, is_enabled, retention_days, updated_at)
  VALUES ('00000000-0000-0000-0000-000000000000', $1, $2, NOW())
  ON CONFLICT (id)
  DO UPDATE SET
    is_enabled = EXCLUDED.is_enabled,
    retention_days = EXCLUDED.retention_days,
    updated_at = NOW()
  RETURNING *
`;

const { rows } = await pool.query(query, [is_enabled, retention_days]);

    return rows[0];
  } catch (error) {
    console.error('Error in upsertAutoDeleteConfig:', error);
    throw error;
  }
};

// שליפת הגדרת מחיקה אוטומטית
export const getAutoDeleteConfig = async () => {
  const query = `SELECT * FROM auto_delete_config LIMIT 1`;
  const { rows } = await pool.query(query);
    console.log('Config from DB:', rows); 

  return rows[0];
};
