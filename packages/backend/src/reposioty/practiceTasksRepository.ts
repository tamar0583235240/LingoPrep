import { pool } from '../config/dbConnection';
import { PracticeTasks } from '../interfaces/entities/PracticeTasks';

function to_snake_case(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export const getPracticeTasksByUserId = async (
  userId: string,
  from?: string,
  to?: string
): Promise<PracticeTasks[]> => {
  let query = 'SELECT * FROM practice_tasks WHERE user_id = $1';
  const params: any[] = [userId];

  if (from && to) {
    query += ' AND start_datetime BETWEEN $2 AND $3';
    params.push(from, to);
  }

  query += ' ORDER BY start_datetime ASC';

  const res = await pool.query(query, params);
  return res.rows;
};

export const getPracticeTaskById = async (id: string): Promise<PracticeTasks | null> => {
  const res = await pool.query('SELECT * FROM practice_tasks WHERE id = $1', [id]);
  return res.rows[0] || null;
};


export const createPracticeTask = async (
  data: Partial<PracticeTasks>
): Promise<PracticeTasks> => {
  const {
    userId,
    title,
    description,
    startDatetime,
    durationMinutes,
    category,
    reminderMinutesBefore,
    status = 'pending',
  } = data;

  const res = await pool.query(
    `INSERT INTO practice_tasks 
     (user_id, title, description, start_datetime, duration_minutes, category, reminder_minutes_before, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     RETURNING *`,
    [
      userId,
      title,
      description,
      startDatetime,
      durationMinutes,
      category,
      reminderMinutesBefore,
      status,
    ]
  );

  return res.rows[0];
};

export const updatePracticeTask = async (
  id: string,
  data: Partial<PracticeTasks>
): Promise<PracticeTasks | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const key in data) {
    fields.push(`${to_snake_case(key)} = $${index}`);
    values.push((data as any)[key]);
    index++;
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `UPDATE practice_tasks SET ${fields.join(
    ', '
  )} WHERE id = $${index} RETURNING *`;

  const res = await pool.query(query, values);
  return res.rows[0] || null;
};

export const deletePracticeTask = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM practice_tasks WHERE id = $1', [id]);
};
