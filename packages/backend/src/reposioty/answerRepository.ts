import { pool } from '../config/dbConnection';
import { Answers } from "../interfaces/entities/Answers";

<<<<<<< HEAD
// ייצוא אובייקט עם כל הפונקציות
export const answerRepository = {
  // יצירת תשובה חדשה
  createAnswer: async (
    userId: string,
    questionId: string,
    fileUrl: string,
    amountFeedbacks: number,
    answerFileName: string
  ): Promise<any> => {
    console.log('Repository: Creating answer with:', {
      userId,
      questionId,
      fileUrl,
      amountFeedbacks,
      answerFileName
    });
=======

export const createAnswer = async (
  userId: string,
  questionId: string,
  fileUrl: string,
  amountFeedbacks: number,
  answerFileName: string
) => {
  console.log('Repository: Creating answer with:', {
    userId,
    questionId,
    fileUrl,
    amountFeedbacks,
    answerFileName
  });

  if (!userId || !questionId || !fileUrl || amountFeedbacks === undefined || !answerFileName) {
    console.error('Missing values in repository function');
    throw new Error('Missing required values in repository');
  }

  try {
    const query = `
      INSERT INTO answers (user_id, question_id, file_url, amount_feedbacks, answer_file_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [userId, questionId, fileUrl, amountFeedbacks, answerFileName];

    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error: any) {
    console.error('Error inserting answer:', error.message || error);
    throw new Error('Failed to create answer');
  }
};

// שליפת כל התשובות
export const getAllAnswers = async () => {
  const { rows } = await pool.query('SELECT * FROM answers;');
  return rows;
};

// שליפת תשובה לפי מזהה
export const getAnswerById = async (id: string) => {
  const query = `SELECT * FROM answers WHERE id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

// עדכון תשובה קיימת
export const updateAnswer = async (id: string, updates: any) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setString = fields
    .map((field, i) => `"${field}" = $${i + 1}`)
    .join(', ');

  const query = `
    UPDATE answers
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [...values, id]);
  return rows[0];
};



// מחיקת תשובה
export const deleteAnswer = async (id: string) => {
  await pool.query('DELETE FROM answers WHERE id = $1;', [id]);
};

const getAllAnswersByIdUser = async (userId:string): Promise<Answers[]> => {
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

    // Validate required fields
    if (!userId || !questionId || !answerFileName) {
      console.error('Missing required values in repository', {
        userId,
        questionId,
        answerFileName
      });
      throw new Error('Missing required values in repository');
    }

    // Set default values for optional fields
    fileUrl = fileUrl || '';
    amountFeedbacks = amountFeedbacks || 0;

    try {
      // Validate UUID format for both userId and questionId
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId)) {
        throw new Error('Invalid user ID format');
      }
      if (!uuidRegex.test(questionId)) {
        throw new Error('Invalid question ID format');
      }

      const query = `
        INSERT INTO answers (user_id, question_id, file_url, amount_feedbacks, answer_file_name)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [userId, questionId, fileUrl, amountFeedbacks, answerFileName];

      const { rows } = await pool.query(query, values);
      if (!rows[0]) {
        throw new Error('Failed to create answer - no rows returned');
      }
      return rows[0];
    } catch (error: any) {
      console.error('Error inserting answer:', error);
      if (error.code === '23503') {
        throw new Error('Invalid user ID or question ID - foreign key constraint failed');
      }
      throw new Error(error.message || 'Failed to create answer');
    }
  },

  // שליפת כל התשובות
  getAllAnswers: async (): Promise<any[]> => {
    const { rows } = await pool.query('SELECT * FROM answers;');
    return rows;
  },

  // שליפת תשובה לפי מזהה
  getAnswerById: async (id: string): Promise<any> => {
    const query = `SELECT * FROM answers WHERE id = $1;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // עדכון תשובה קיימת
  updateAnswer: async (id: string, updates: any): Promise<any> => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    const setString = fields
      .map((field, i) => `"${field}" = $${i + 1}`)
      .join(', ');

    const query = `
      UPDATE answers
      SET ${setString}
      WHERE id = $${fields.length + 1}
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  },

  // מחיקת תשובה
  deleteAnswer: async (id: string): Promise<void> => {
    await pool.query('DELETE FROM answers WHERE id = $1;', [id]);
  },

  // קבלת כל התשובות של משתמש ספציפי
  getAllAnswersByIdUser: async (userId: string): Promise<Answers[]> => {
    console.log("Fetching answers for user ID:", userId);
    try {
      const query = 'SELECT id, user_id, question_id, file_url, answer_file_name, submitted_at, amount_feedbacks FROM answers WHERE user_id = $1';
      const values = [userId];
      const { rows } = await pool.query(query, values);
      return rows as Answers[];
    } catch (error) {
      console.error("Error fetching answers from Supabase:", error);
      throw error;
    }
  }
};

// ייצוא ברירת מחדל של אובייקט הרפוזיטורי
export default answerRepository;
