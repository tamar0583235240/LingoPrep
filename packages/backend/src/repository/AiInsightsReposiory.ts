import { pool } from '../config/dbConnection';
import { AiInsights } from '../interfaces/entities/AiInsights';
import { v4 as uuidv4 } from 'uuid';
// שליפת כל התובנות
export const getAllInsights = async (): Promise<AiInsights[]> => {
  console.log('[AI][Repo] getAllInsights called');
  const { rows } = await pool.query('SELECT * FROM ai_insights;');
  console.log('[AI][Repo] getAllInsights result:', rows.length);
  return rows;
};
// שליפת תובנה לפי מזהה תשובה
export const getInsightById = async (answerId: string): Promise<AiInsights | null> => {
  console.log('[AI][Repo] getInsightById called:', answerId);
  const query = `SELECT * FROM ai_insights WHERE answer_id = $1;`;
  const { rows } = await pool.query(query, [answerId]);
  console.log('[AI][Repo] getInsightById result:', rows[0]);
  return rows[0] || null;
};
// שליפת תובנות לפי מזהה תשובה (רשימה)
export const getAiInsightsByAnswerId = async (answerId: string): Promise<AiInsights[]> => {
  console.log('[AI][Repo] getAiInsightsByAnswerId called:', answerId);
  const { rows } = await pool.query('SELECT * FROM ai_insights WHERE answer_id = $1', [answerId]);
  console.log('[AI][Repo] getAiInsightsByAnswerId result:', rows.length);
  return rows;
};
// יצירת תובנה חדשה
export const createInsight = async (
  answerId: string,
  summary: string,
  rating: string,
  strengths: string,
  improvements: string,
  flow?: string,
  confidence?: string
) => {
  const id = uuidv4();
  const ratingInt = parseInt(rating, 10);
  console.log('[AI][Repo] createInsight called:', { answerId, summary, rating, strengths, improvements, flow, confidence });
  if (!answerId || !summary || isNaN(ratingInt)) {
    console.error('[AI][Repo] Missing required values in repository', { answerId, summary, rating });
    throw new Error('Missing required values in repository');
  }
  const query = `
    INSERT INTO ai_insights (id, answer_id, summary, rating, strengths, improvements, flow, confidence)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [id, answerId, summary, ratingInt, strengths, improvements, flow || null, confidence || null];
  try {
    const { rows } = await pool.query(query, values);
    console.log('[AI][Repo] createInsight result:', rows[0]);
    return rows[0];
  } catch (err) {
    console.error('[AI][Repo] Error in createInsight:', err);
    throw err;
  }
};
// עדכון תובנה
export const updateInsight = async (id: string, updates: any) => {
  console.log('[AI][Repo] updateInsight called:', { id, updates });
  const setClause = Object.keys(updates)
    .map((key, i) => `"${key}" = $${i + 2}`)
    .join(', ');
  const values = [id, ...Object.values(updates)];
  const query = `
    UPDATE ai_insights
    SET ${setClause}
    WHERE id = $1
    RETURNING *;
  `;
  try {
    const { rows } = await pool.query(query, values);
    console.log('[AI][Repo] updateInsight result:', rows[0]);
    return rows[0];
  } catch (err) {
    console.error('[AI][Repo] Error in updateInsight:', err);
    throw err;
  }
};
// מחיקת תובנה
export const deleteInsight = async (id: string) => {
  console.log('[AI][Repo] deleteInsight called:', id);
  await pool.query('DELETE FROM ai_insights WHERE id = $1;', [id]);
  console.log('[AI][Repo] deleteInsight finished:', id);
};




















