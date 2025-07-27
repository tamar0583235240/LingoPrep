import { pool } from '../config/dbConnection';
import { Answers } from "../interfaces/entities/Answers";

const getAllAnswersByIdUser = async (userId:string): Promise<Answers[]> => {

  console.log("Fetching answers for user ID:", userId);
  try{
    const query = 'SELECT id, user_id, question_id, file_url,answer_file_name ,submitted_at,amount_feedbacks FROM answers WHERE user_id = \$1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows as Answers[];
  } catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}

export const notificationRepository = {
  async insertNotification(notification: {
    user_id: string;
    type: string;
    message: string;
    is_seen?: boolean;
    created_at?: Date;
  }) {
    console.log("Inserting notification:", notification);
    const { user_id, type, message, is_seen = false, created_at = new Date() } = notification;

    const query = `
      INSERT INTO notifications (user_id, type, message, is_seen, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [user_id, type, message, is_seen, created_at];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  },
};

export default { getAllAnswersByIdUser };