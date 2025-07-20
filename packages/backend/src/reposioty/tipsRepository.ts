import { pool } from '../config/dbConnection';
import { Tips } from "../interfaces/entities/Tips";
import { v4 as uuid4 } from 'uuid';

const addTip = async (tip: Tips): Promise<Tips> => {
  try {
    const id = uuid4();
    const query = `
      INSERT INTO tips (id, content, created_at)
      VALUES ($1, $2, NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [id, tip.content]);
    return result.rows[0] as Tips;
  } catch (error) {
    console.error("Error adding tip:", error);
    throw new Error("ADD_TIP_FAILED");
  }
};

const getAllTips = async (): Promise<Tips[]> => {
  try {
    const query = 'SELECT * FROM tips';
    const { rows } = await pool.query(query);
    return rows as Tips[];
  } catch (error) {
    console.error("Error fetching tips:", error);
    throw new Error("GET_ALL_TIPS_FAILED");
  }
};

const updateTipById = async (updates: Tips): Promise<Tips> => {
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
    UPDATE tips
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [...values, id]);
    if (rows.length === 0) {
      throw new Error("TIP_NOT_FOUND");
    }
    return rows[0];
  } catch (error) {
    console.error('Error updating tip:', error);
    throw new Error("UPDATE_TIP_FAILED");
  }
};

const deleteTipById = async (id: string): Promise<string> => {
  try {
    const query = 'DELETE FROM tips WHERE id = $1';
    const { rowCount } = await pool.query(query, [id]);
    if (rowCount === 0) {
      throw new Error("TIP_NOT_FOUND");
    }
    return "Tip deleted successfully";
  } catch (error) {
    console.error("Error deleting tip:", error);
    throw new Error("DELETE_TIP_FAILED");
  }
};

export default {
  getAllTips,
  deleteTipById,
  addTip,
  updateTipById
};