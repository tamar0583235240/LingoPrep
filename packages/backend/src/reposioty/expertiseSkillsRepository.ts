import { pool } from "../config/dbConnection";

export const getUserExpertiseSkills = async (user_id: string) => {
  const query = `
    SELECT * FROM expertise_skills
    WHERE user_id = $1
  `;
  const result = await pool.query(query, [user_id]);
  return result.rows;
};

export const addExpertiseSkill = async (
  user_id: string,
  category: string,
  name: string,
  level?: string
) => {
  const query = `
    INSERT INTO expertise_skills (user_id, category, name, level)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await pool.query(query, [user_id, category, name, level]);
  return result.rows[0];
};

export const updateSkillDetail = async (skillId: number, data: any) => {
  const { user_id, category, name, level } = data;
  const query = `
    UPDATE expertise_skills
    SET
      category = $1,
      name = $2,
      level = $3
    WHERE id = $4 AND user_id = $5
    RETURNING *;
  `;
  const result = await pool.query(query, [
    category,
    name,
    level,
    skillId,
    user_id,
  ]);
  return result.rows[0];
};

export const deleteExpertiseSkill = async (
  skillId: number,
  user_id: string
) => {
  const query = `
    DELETE FROM expertise_skills
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;
  const result = await pool.query(query, [skillId, user_id]);
  return result.rows[0];
};
