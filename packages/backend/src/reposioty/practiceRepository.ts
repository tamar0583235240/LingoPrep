import { pool } from '../config/dbConnection';
import { Practices } from "../interfaces/entities/Practices";
import { v4 as uuid4 } from 'uuid';

const addPractice = async (practice: Practices): Promise<Practices> => {
  try {
    const id = uuid4();
    const query = `
      INSERT INTO practices (id, content, created_at)
      VALUES ($1, $2, NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [id, practice.content]);
    return result.rows[0] as Practices;
  } catch (error) {
    console.error("Error adding practice:", error);
    throw new Error("ADD_PRACTICE_FAILED");
  }
};

const getAllPractices = async (): Promise<Practices[]> => {
  try {
    const query = 'SELECT * FROM practices';
    const { rows } = await pool.query(query);
    return rows as Practices[];
  } catch (error) {
    console.error("Error fetching practices:", error);
    throw new Error("GET_ALL_PRACTICES_FAILED");
  }
};

const updatePracticeById = async (updates: Practices): Promise<Practices> => {
  const { id, ...fieldsToUpdate } = updates;
  const fields = Object.keys(fieldsToUpdate);

  if (fields.length === 0) {
    throw new Error('NO_FIELDS_TO_UPDATE');
  }

  const values = Object.values(fieldsToUpdate);
  const setString = fields
    .map((field, i) => `"${field}" = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE practices
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [...values, id]);
    if (rows.length === 0) {
      throw new Error("PRACTICE_NOT_FOUND");
    }
    return rows[0];
  } catch (error) {
    console.error('Error updating practice:', error);
    throw new Error("UPDATE_PRACTICE_FAILED");
  }
};

const deletePracticeById = async (id: string): Promise<string> => {
  try {
    const query = 'DELETE FROM practices WHERE id = $1';
    const { rowCount } = await pool.query(query, [id]);
    if (rowCount === 0) {
      throw new Error("PRACTICE_NOT_FOUND");
    }
    return "Practice deleted successfully";
  } catch (error) {
    console.error("Error deleting practice:", error);
    throw new Error("DELETE_PRACTICE_FAILED");
  }
};

export default {
  getAllPractices,
  deletePracticeById,
  addPractice,
  updatePracticeById
};