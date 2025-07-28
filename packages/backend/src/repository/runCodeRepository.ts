import { pool } from "../config/dbConnection";

// שליפת שאלות לפי נושא
export const getQuestionsByTopic = async (topicId: string) => {
  const { rows } = await pool.query(
    `SELECT q.* 
     FROM practice_questions q
     JOIN question_topics qt ON qt.question_id = q.id
     WHERE qt.topic_id = $1`,
    [topicId]
  );
  return rows;
};

// בדיקת תשובה מול hints
export const checkAnswer = async (questionId: string, answer: string) => {
  const { rows } = await pool.query(
    `SELECT * FROM hints 
     WHERE question_id = $1 AND content = $2`,
    [questionId, answer]
  );
  return rows.length > 0;
};
