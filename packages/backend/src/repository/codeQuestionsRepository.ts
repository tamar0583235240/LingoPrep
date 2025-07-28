import { pool } from "../config/dbConnection";


export const getAllTopicsFromDB = async () => {
  const result = await pool.query("SELECT * FROM topics ORDER BY created_at DESC");
  return result.rows;
};

export const getAllQuestionsFromDB = async (topicName?: string, level?: string, type?: string | undefined) => {
  try {
    const values: any[] = [];
    let query = `
      SELECT pq.*
      FROM practice_questions pq
    `;

    let whereClauses: string[] = [];

    // אם סונן לפי topic
    if (topicName) {
      query += `
        INNER JOIN question_topics qt ON pq.id = qt.question_id
        INNER JOIN topics t ON qt.topic_id = t.id
      `;
      values.push(topicName);
      whereClauses.push(`t.name = $${values.length}`);
    }

    // אם סונן לפי difficulty
    if (level) {
      values.push(level);
      whereClauses.push(`pq.difficulty = $${values.length}`);
    }

    // אם סונן לפי type
    if (type) {
      values.push(type);
      whereClauses.push(`pq.type = $${values.length}`);
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ` + whereClauses.join(' AND ');
    }

    console.log('Final SQL query:', query);
    console.log('With values:', values);

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error fetching questions from DB:', error);
    throw error;
  }
};

// שמירת תשובת המשתמש ועדכון הסטטוס
// export const upsertQuestionStatus = async (
//   userId: string,
//   questionId: string,
//   status: "not_started" | "in_progress" | "completed",
//   answer: string | null
// ) => {
//   const findQuery = `
//     SELECT * FROM user_practice_answers
//     WHERE user_id = $1 AND question_id = $2
//   `;
//   const result = await pool.query(findQuery, [userId, questionId]);

//   if (result.rows.length > 0) {
//     // עדכון רשומה קיימת
//     const updateQuery = `
//       UPDATE user_practice_answers
//       SET status = $3, answer = $4
//       WHERE user_id = $1 AND question_id = $2
//       RETURNING *
//     `;
//     const updateResult = await pool.query(updateQuery, [userId, questionId, status, answer]);
//     return updateResult.rows[0];
//   } else {
//     // יצירת רשומה חדשה
//     const insertQuery = `
//       INSERT INTO user_practice_answers (user_id, question_id, status, answer)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *
//     `;
//     const insertResult = await pool.query(insertQuery, [userId, questionId, status, answer]);
//     return insertResult.rows[0];
//   }
// };


// עדכון סטטוס שאלה
export const updateQuestionStatus = async (
  userId: string,
  questionId: string,
  status: "not_started" | "in_progress" | "completed"
) => {
  const findQuery = `
    SELECT * FROM user_practice_answers
    WHERE user_id = $1 AND question_id = $2
  `;
  const result = await pool.query(findQuery, [userId, questionId]);

  if (result.rows.length > 0) {
    // עדכון סטטוס ברשומה קיימת
    const updateQuery = `
      UPDATE user_practice_answers
      SET status = $3
      WHERE user_id = $1 AND question_id = $2
      RETURNING *
    `;
    const updateResult = await pool.query(updateQuery, [userId, questionId, status]);
    return updateResult.rows[0];
  } else {
    // יצירת רשומה עם סטטוס בלבד
    const insertQuery = `
      INSERT INTO user_practice_answers (user_id, question_id, status)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const insertResult = await pool.query(insertQuery, [userId, questionId, status]);
    return insertResult.rows[0];
  }
};

// DB שמירת/עדכון התשובה של המשתמש ב 
export const saveUserAnswer = async (
  userId: string,
  questionId: string,
  answer: string,
  codeLanguage: string | null = null
) => {
  const findQuery = `
    SELECT * FROM user_practice_answers
    WHERE user_id = $1 AND question_id = $2
  `;
  const result = await pool.query(findQuery, [userId, questionId]);

  if (result.rows.length > 0) {
    // עדכון תשובה ברשומה קיימת
    const updateQuery = `
      UPDATE user_practice_answers
      SET answer = $3, code_language = $4
      WHERE user_id = $1 AND question_id = $2
      RETURNING *
    `;
    const updateResult = await pool.query(updateQuery, [userId, questionId, answer, codeLanguage]);
    return updateResult.rows[0];
  } else {
    // יצירת רשומה חדשה עם תשובה
    const insertQuery = `
      INSERT INTO user_practice_answers (user_id, question_id, answer, code_language)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const insertResult = await pool.query(insertQuery, [userId, questionId, answer, codeLanguage]);
    return insertResult.rows[0];
  }
};

// שליפת הסטטוס של כל השאלות לפי משתמש
export const getStatusesByUserId = async (userId: string) => {
  const query = `
    SELECT question_id, status
    FROM user_practice_answers
    WHERE user_id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// שליפת התשובה של המשתמש
export const getUserAnswer = async (userId: string, questionId: string) => {
  const query = `
    SELECT question_id, answer, code_language, status
    FROM user_practice_answers
    WHERE user_id = $1 AND question_id = $2
  `;
  const result = await pool.query(query, [userId, questionId]);
  return result.rows[0] ?? null;
}

// מחיקת תשובה של המשתמש
export const deleteUserAnswer = async (userId: string, questionId: string): Promise<boolean> => {
  const query = `
    DELETE FROM user_practice_answers
    WHERE user_id = $1 AND question_id = $2
  `;
  const result = await pool.query(query, [userId, questionId]);
  return !!result.rowCount; // מחזיר true אם נמחקה תשובה אחת לפחות
};

// הוספה או עדכון לייק
export const upsertQuestionLike = async (
  userId: string,
  questionId: string,
  liked: boolean
) => {
  const query = `
    INSERT INTO question_likes (user_id, question_id, liked)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, question_id)
    DO UPDATE SET liked = EXCLUDED.liked, created_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const result = await pool.query(query, [userId, questionId, liked]);
  return result.rows[0];
};

// ספירת לייקים ודיסלייקים לשאלה ספציפית
export const getLikesDislikesByQuestion = async (questionId: string) => {
  const query = `
    SELECT
      SUM(CASE WHEN liked = true THEN 1 ELSE 0 END) AS likes,
      SUM(CASE WHEN liked = false THEN 1 ELSE 0 END) AS dislikes
    FROM question_likes
    WHERE question_id = $1;
  `;
  const result = await pool.query(query, [questionId]);
  return {
    likes: Number(result.rows[0].likes) || 0,
    dislikes: Number(result.rows[0].dislikes) || 0,
  };
};

// שליפת כל הלייקים לכל השאלות
export const getAllLikes = async () => {
  const query = `
    SELECT question_id,
      SUM(CASE WHEN liked = true THEN 1 ELSE 0 END) AS likes,
      SUM(CASE WHEN liked = false THEN 1 ELSE 0 END) AS dislikes
    FROM question_likes
    GROUP BY question_id;
  `;
  const result = await pool.query(query);
  return result.rows;
};