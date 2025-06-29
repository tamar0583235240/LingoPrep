import { pool } from '../config/dbConnection';

export const getSharedRecordingsByUserId = async (userId: string) => {
  const query = `
    SELECT
      sr.id,
      u.first_name || ' ' || u.last_name AS "userName",
      q.title AS "questionTitle",
      sr.date,
      sr.audio_url AS "audioUrl",
      sr.ai_summary AS "aiSummary",
      f.comment AS "feedbackComment",
      f.rating AS "feedbackRating"
    FROM shared_recordings sr
    JOIN users u ON sr.owner_id = u.id
    JOIN questions q ON sr.question_id = q.id
    LEFT JOIN feedback f ON f.sharedrecordingid = sr.id
    WHERE $1 = ANY(sr.sharedwith)

  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
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


export const insertFeedback = async (sharedRecordingId: string, comment: string, rating: number) => {
  const query = `
    INSERT INTO feedback (id, sharedrecordingid, comment, rating, createdat)
    VALUES (gen_random_uuid(), $1, $2, $3, NOW())
    RETURNING *
  `;
  const { rows } = await pool.query(query, [sharedRecordingId, comment, rating]);
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

