import { pool } from '../config/dbConnection';
import { DynamicContents } from '../interfaces/entities/DynamicContents';

const getAllDynamicContents = async (): Promise<DynamicContents[]> => {
  try {
    const result = await pool.query('SELECT * FROM dynamic_contents ORDER BY id');
    return result.rows as DynamicContents[];
  } catch (error) {
    console.error('Error fetching dynamic contents:', error);
    throw error;
  }
};

const getDynamicContentById = async (id: string): Promise<DynamicContents | null> => {
  try {
    const result = await pool.query('SELECT * FROM dynamic_contents WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching dynamic content by id:', error);
    throw error;
  }
};

const updateDynamicContent = async (id: string, content: string): Promise<DynamicContents> => {
  try {
    const query = `
      UPDATE dynamic_contents
      SET content = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;
    const values = [content, id];
    const result = await pool.query(query, values);
    return result.rows[0] as DynamicContents;
  } catch (error) {
    console.error('Error updating dynamic content:', error);
    throw error;
  }
};

export default { getAllDynamicContents, getDynamicContentById, updateDynamicContent };
