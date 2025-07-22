import { pool } from '../config/dbConnection';
import { Questions } from '../interfaces/entities/Questions';

const getUserAnsweredQuestions
  = async (
    userId: string,
    category: string
  ): Promise<Questions[]> => {
    try {
      const query = `
      SELECT q.id, q.title, q.content, q.category, q.tips, q.ai_guidance, q.is_active, 
      FROM "answers" a
      INNER JOIN "questions" q ON a.question_id = q.id
      WHERE a.user_id = $1 AND q.category = $2
    `;
      const result = await pool.query(query, [userId, category]);
      return result.rows as Questions[];
    } catch (error) {
      console.error("❌ Error fetching answered questions by user and category:", error);
      throw error;
    }
  };
export default {
  getUserAnsweredQuestions
};