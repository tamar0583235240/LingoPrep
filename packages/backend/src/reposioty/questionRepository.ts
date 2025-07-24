import { pool } from '../config/dbConnection';
import { Questions } from "../interfaces/entities/Questions";
import { v4 as uuid4 } from 'uuid';

const addQustion = async (question: Questions): Promise<Questions> => {
  try {

    let id: string = "";
    let exists = true;
    id = uuid4();
    const query = `
      INSERT INTO questions (id , title , content , category , tips , ai_guidance , is_active)
      VALUES ('${id}', '${question.title}', '${question.content}', '${question.category}', '${question.tips}', '${question.aiGuidance}','${question.isActive}')
    `;

    const result = await pool.query(query);
    return result.rows[0] as Questions;

  } catch (error) {
    console.error("Error adding question to PostgreSQL:", error);
    throw error;
  }
};



const getAllQuestionById = async (Id: string): Promise<Questions> => {

  try {
    const query = 'SELECT * FROM questions WHERE id = \$1';
    const value = [Id];
    const { rows } = await pool.query(query, value);
    return rows[0] as Questions;

  } catch (error) {
    console.error("Error fetching question from Supabase:", error);
    throw error;
  }
}

const getAllQuestions = async (): Promise<Questions[]> => {

  try {
    const query = 'SELECT * FROM questions';
    const { rows } = await pool.query(query);
    return rows as Questions[];

  } catch (error) {
    console.error("Error fetching questions from Supabase:", error);
    throw error;
  }
}




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
}



const deleteQuestionById = async (id: string, is_active: boolean): Promise<string> => {
  try {
    const query = 'UPDATE questions SET is_active = $1 WHERE id = $2';
    const values = [is_active, id];
    await pool.query(query, values);
    return "Question deleted successfully";
  } catch (error) {
    console.error("Error deleting question from Supabase:", error);
    throw error;
  }
}
export default { getAllQuestionById, getAllQuestions, deleteQuestionById, addQustion, updateQuestionById };

