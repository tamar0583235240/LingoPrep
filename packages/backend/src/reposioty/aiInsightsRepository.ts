// repositories/aiInsightsRepository.ts
import { pool } from '../config/dbConnection';
import { AiInsights } from '../interfaces/entities/AiInsights';
import { v4 as uuidv4 } from 'uuid';

// שליפת כל התובנות
export const getAllInsights = async (): Promise<AiInsights[]> => {
  const { rows } = await pool.query('SELECT * FROM ai_insights;');
  return rows;
};

// שליפת תובנה לפי מזהה תשובה
export const getInsightById = async (answerId: string): Promise<AiInsights | null> => {
  const query = `SELECT * FROM ai_insights WHERE answer_id = $1;`;
  const { rows } = await pool.query(query, [answerId]);
  return rows[0] || null;
};

// שליפת תובנות לפי מזהה תשובה (רשימה)
export const getAiInsightsByAnswerId = async (answerId: string): Promise<AiInsights[]> => {
  const { rows } = await pool.query('SELECT * FROM ai_insights WHERE answer_id = $1', [answerId]);
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

  if (!answerId || !summary || isNaN(ratingInt)) {
    throw new Error('Missing required values in repository');
  }

  const query = `
    INSERT INTO ai_insights (id, answer_id, summary, rating, strengths, improvements, flow, confidence)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  const values = [id, answerId, summary, ratingInt, strengths, improvements, flow || null, confidence || null];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// עדכון תובנה
export const updateInsight = async (id: string, updates: any) => {
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

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// מחיקת תובנה
export const deleteInsight = async (id: string) => {
  await pool.query('DELETE FROM ai_insights WHERE id = $1;', [id]);
};
