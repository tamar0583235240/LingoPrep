import { pool } from "../config/dbConnection";
import { WorkExperiences } from "../interfaces/entities/WorkExperiences";

function to_snake_case(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export const getWorkExperiencesByUserId = async (
  userId: string
): Promise<WorkExperiences[]> => {
  const query = `SELECT * FROM work_experiences WHERE user_id = $1 ORDER BY start_date DESC`;
  const res = await pool.query(query, [userId]);
  return res.rows;
};

export const getWorkExperienceById = async (
  id: string
): Promise<WorkExperiences | null> => {
  const res = await pool.query("SELECT * FROM work_experiences WHERE id = $1", [
    id,
  ]);
  return res.rows[0] || null;
};

export const createWorkExperience = async (
  data: Partial<WorkExperiences>
): Promise<WorkExperiences> => {
  const {
    id,
    user,
    companyName,
    position,
    description,
    startDate,
    endDate,
    isPublic,
    createdAt,
    updatedAt,
  } = data;

  const query = `
    INSERT INTO work_experiences
      (id, user_id, company_name, position, description, start_date, end_date, is_public, created_at, updated_at)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;
  const values = [
    id,
    user?.id,
    companyName,
    position,
    description || null,
    startDate,
    endDate || null,
    isPublic ?? false,
    createdAt ?? new Date(),
    updatedAt ?? new Date(),
  ];

  const res = await pool.query(query, values);
  return res.rows[0];
};

export const updateWorkExperience = async (
  id: string,
  data: Partial<WorkExperiences>
): Promise<WorkExperiences | null> => {
  delete (data as any).user;

  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  const skipKeys = new Set(["id", "createdAt", "user"]);

  for (const key in data) {
    if (skipKeys.has(key)) continue;

    fields.push(`${to_snake_case(key)} = $${index}`);
    values.push((data as any)[key]);
    index++;
  }

  if (data.user?.id) {
    fields.push(`user_id = $${index}`);
    values.push(data.user.id);
    index++;
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `UPDATE work_experiences SET ${fields.join(
    ", "
  )} WHERE id = $${index} RETURNING *`;
  const res = await pool.query(query, values);
  return res.rows[0] || null;
};

export const deleteWorkExperience = async (id: string): Promise<void> => {
  await pool.query("DELETE FROM work_experiences WHERE id = $1", [id]);
};
