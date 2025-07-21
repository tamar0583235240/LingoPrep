import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { pool } from '../config/dbConnection'; 
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

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
  const ratingInt = parseInt(rating, 10);
  const id = uuidv4(); // יצירת ID חדש
  
  console.log('Repository: Creating ai_insight with:', { 
    id,
    answerId, 
    summary, 
    rating: ratingInt, 
    strengths, 
    improvements, 
    flow, 
    confidence 
  });
  
  if (!answerId || !summary || isNaN(ratingInt)) {
    console.error('Missing values in repository function');
    throw new Error('Missing required values in repository');
  }

  try {
    const query = `
      INSERT INTO ai_insights (id, answer_id, summary, rating, strengths, improvements, flow, confidence)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [id, answerId, summary, ratingInt, strengths, improvements, flow || null, confidence || null];

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
  const setClause = Object.keys(updates)
    .map((key, i) => `${key} = $${i + 2}`)
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
  const query = `DELETE FROM ai_insights WHERE id = $1;`;
  await pool.query(query, [id]);
};

