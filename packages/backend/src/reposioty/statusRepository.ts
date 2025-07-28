import { pool } from '../config/dbConnection';

const getUserAnsweredQuestions
  = async (
    userId: string,
    category: string
  ): Promise<{ id: string }[]> => {
    try {
      const query = `
      SELECT q.id
      FROM answers a
      INNER JOIN questions q ON a.question_id = q.id
      INNER JOIN question_categories qc ON qc.question_id = q.id
      WHERE a.user_id = $1 AND qc.category_id = $2
      GROUP BY q.id
    `;
      const result = await pool.query(query, [userId, category]);
      return result.rows as { id: string }[];
    } catch (error) {
      console.error("❌ Error fetching answered questions by user and category:", error);
      throw error;
    }
  };
export default {
  getUserAnsweredQuestions
};