

import { pool } from '../config/dbConnection';
import { AiInsights } from '../interfaces/entities/AiInsights';

const getAiInsights = async (): Promise<AiInsights[]> => {
  try {
    const result = await pool.query('SELECT * FROM ai_insights');
    return result.rows as AiInsights[];
  } catch (error) {
    console.error('Error fetching AIInsight from PostgreSQL:', error);
    throw error;
  }
};

const getAiInsightsByAnswerId = async (answerId: string): Promise<AiInsights[]> => {
  try {
    const data = await pool.query(`SELECT * FROM ai_insights WHERE answer_id = $1`, [answerId]);
    return data.rows as AiInsights[];
  } catch (error) {
    console.error(`Error fetching AI insights by answerId: ${answerId} from PostgreSQL:`, error);
    throw error;
  }
};



// יצירת תובנה חדשה
export const createInsight = async (
  answerId: string,
  summary: string,
  rating: string,
  strengths: string,
  improvements: string
) => {
  const ratingInt = parseInt(rating, 10);
  console.log('Repository: Creating ai_insight with:', { answerId, summary, rating: ratingInt, strengths, improvements });
  if (!answerId || !summary || isNaN(ratingInt)) {
    console.error('Missing values in repository function');
    throw new Error('Missing required values in repository');
  }

  try {
    const query = `
      INSERT INTO ai_insights (answer_id, summary, rating, strengths, improvements)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [answerId, summary, ratingInt, strengths, improvements];

    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error: any) {
    console.error('Error inserting ai_insight:', error); 
    throw error; 
  }
};

// שליפת כל התובנות
export const getAllInsights = async () => {
  const { rows } = await pool.query('SELECT * FROM ai_insights;');
  return rows;
};

// שליפת תובנה לפי מזהה
export const getInsightById = async (id: string) => {
  const query = `SELECT * FROM ai_insights WHERE answer_id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// עדכון תובנה קיימת
export const updateInsight = async (id: string, updates: any) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setString = fields
    .map((field, i) => `"${field}" = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE ai_insights
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [...values, id]);
  return rows[0];
};

// מחיקת תובנה
export const deleteInsight = async (id: string) => {
  await pool.query('DELETE FROM ai_insights WHERE id = $1;', [id]);
};

export default { getAiInsights, getAiInsightsByAnswerId };
