import { pool } from '../config/dbConnection';
import { Questions } from '../interfaces/entities/Questions';
import { v4 as uuid4 } from 'uuid';

const addQuestion = async (question: Questions): Promise<Questions> => {
  try {
    const id = uuid4();
    const query = `
      INSERT INTO questions (id, title, content, tips, ai_guidance, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      id,
      question.title,
      question.content,
      question.tips,
      question.aiGuidance,
      question.isActive
    ];
    const result = await pool.query(query, values);
    return result.rows[0] as Questions;
  } catch (error) {
    console.error("Error adding question to PostgreSQL:", error);
    throw error;
  }
};

const getAllQuestions = async (): Promise<Questions[]> => {
  try {
    const query = `
      SELECT id, title, content, tips, ai_guidance, is_active
      FROM questions
      WHERE is_active = TRUE
    `;
    const result = await pool.query(query);
    return result.rows as Questions[];
  } catch (error) {
    console.error(":x: Error fetching questions:", error);
    throw error;
  }
};

const getQuestionById = async (id: string): Promise<Questions> => {
  try {
    const query = 'SELECT * FROM questions WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0] as Questions;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

const updateQuestionById = async (updates: Questions) => {
  const { id, ...fieldsToUpdate } = updates;
  const fields = Object.keys(fieldsToUpdate);
  if (fields.length === 0) {
    throw new Error('No fields provided for update.');
  }
  const values = Object.values(fieldsToUpdate);
  const setString = fields
    .map((field, i) => `"${field}" = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE questions
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [...values, id]);
    if (rows.length === 0) {
      throw new Error(`Question with id ${id} not found`);
    }
    return rows[0];
  } catch (error) {
    console.error('Error updating question:', error);
    throw new Error('Failed to update question');
  }
};

const deleteQuestionById = async (id: string, is_active: boolean): Promise<string> => {
  try {
    const query = 'UPDATE questions SET is_active = $1 WHERE id = $2';
    const values = [is_active, id];
    await pool.query(query, values);
    return "Question deleted successfully";
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

const getQuestionsByCategory = async (category_id: string): Promise<Questions[]> => {
  try {
    const query = `
      SELECT q.*
      FROM questions q
      JOIN question_categories qc ON qc.question_id = q.id
      WHERE qc.category_id = $1 AND q.is_active = TRUE
    `;
    const result = await pool.query(query, [category_id]);
    return result.rows as Questions[];
  } catch (error) {
    console.error(":x: Error fetching questions by category:", error);
    throw error;
  }
};

export default { 
  getQuestionById,
  getAllQuestions,
  deleteQuestionById,
  addQuestion,
  updateQuestionById,
  getQuestionsByCategory
};
