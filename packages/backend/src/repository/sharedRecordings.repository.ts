import { pool } from '../config/dbConnection';

export const getSharedRecordingsByUserId = async (userId: string, role: string) => {
if (role === 'manager') {
  const query = `
    SELECT
      sr.id,
      sr.username AS "userName",
      sr.questiontitle AS "questionTitle",
      sr.date,
      sr.audiourl AS "audioUrl",
      sr.aisummary AS "aiSummary",
      f.comment AS "feedbackComment",
      f.rating AS "feedbackRating"
    FROM shared_recordings sr
    LEFT JOIN feedback f ON f.shared_recording_id = sr.id
  `;
  const { rows } = await pool.query(query);
  return rows;
}
  else {
    const query = `
    SELECT
      sr.id,
      sr.username AS "userName",
      sr.questiontitle AS "questionTitle",
      sr.date,
      sr.audiourl AS "audioUrl",
      sr.aisummary AS "aiSummary",
      f.comment AS "feedbackComment",
      f.rating AS "feedbackRating"
    FROM shared_recordings sr
    LEFT JOIN feedback f ON f.shared_recording_id = sr.id
    WHERE $1 = ANY(sr.sharedwith)
  `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
};

export const getRecordingDetailsById = async (recordingId: string) => {
  const query = `
    SELECT sr.*, u.first_name, u.last_name, q.title AS question_title, f.comment, f.rating
    FROM shared_recordings sr
    JOIN users u ON sr.owner_id = u.id
    JOIN questions q ON sr.question_id = q.id
    LEFT JOIN feedback f ON f.sharedrecordingid = sr.id
    WHERE sr.id = $1
  `;
  const { rows } = await pool.query(query, [recordingId]);
  return rows[0];
};

export const getSharedRecordingIdByAnswerId = async (answerId: string) => {
  const query = `
    SELECT id FROM shared_recordings
    WHERE answer_id = $1
  `;
  const { rows } = await pool.query(query, [answerId]);
  return rows[0]?.id;
};



export const insertFeedback = async (
  sharedRecordingId: string,
  comment: string,
  rating: number,
  givenByUserId: string
) => {
  const query = `
    INSERT INTO feedback (id, shared_recording_id, comment, rating, created_at, given_by_user_id)
    VALUES (gen_random_uuid(), $1, $2, $3, NOW(), $4)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [sharedRecordingId, comment, rating, givenByUserId]);
  return rows[0];
};


export const updateFeedback = async (feedbackId: string, comment: string, rating: number) => {
  const query = `
    UPDATE feedback
    SET comment = $1, rating = $2
    WHERE id = $3
    RETURNING *
  `;
  const { rows } = await pool.query(query, [comment, rating, feedbackId]);
  return rows[0];
};

export const getFeedbackByRecordingAndUser = async (sharedRecordingId: string, givenByUserId: string) => {
  const query = `
    SELECT * FROM feedback
    WHERE shared_recording_id = $1 AND given_by_user_id = $2
  `;
  const { rows } = await pool.query(query, [sharedRecordingId, givenByUserId]);
  return rows[0];
};