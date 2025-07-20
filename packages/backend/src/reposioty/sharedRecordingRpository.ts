import { log } from 'console';
import { pool } from '../config/dbConnection';

export const getSharedWithByAnswerAndOwner = async (
  answerId: string,
  ownerId: string
): Promise<{ name: string; email: string }[]> => {
  try {
    console.log('Fetching shared recordings for answerId:', answerId, 'and ownerId:', ownerId);
    const query = `
      SELECT
        u.first_name || ' ' || u.last_name AS name,
        u.email
      FROM shared_recordings sr
      JOIN LATERAL unnest(sr.shared_with) AS shared_email(email) ON true
      JOIN users u ON u.email = shared_email.email
      WHERE sr.answer_id = $1 AND sr.owner_id = $2
    `;
    const values = [answerId, ownerId];
    const { rows } = await pool.query(query, values);
    console.log('Shared recordings fetched successfully:', rows);
    return rows.map(row => ({
      name: row.name,
      email: row.email
    }));

  } catch (error) {
    console.error("Error fetching shared recordings:", error);
    throw error;
  }
};

export const getAllPreviouslySharedEmails = async (
  userId: string
): Promise<{ name: string; email: string }[]> => {
  const query = `
    SELECT DISTINCT
      u.first_name || ' ' || u.last_name AS name,
      u.email
    FROM shared_recordings sr
    JOIN LATERAL unnest(sr.shared_with) AS shared_email(email) ON true
    JOIN users u ON u.email = shared_email.email
    WHERE sr.owner_id = $1
  `;
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows.map(row => ({
    name: row.name,
    email: row.email
  }));
};

export const getSharedRecordingIdByAnswerId = async (answerId: string): Promise<string | null> => {
  try {

    const data = await pool.query(`SELECT id FROM shared_recordings WHERE answer_id = $1`, [answerId]);

    console.log(data.rows.length);

    return data.rows[0].id as string;
  }
  catch (error) {
    console.error(`Error fetching sharedRecordingId by answerId: ${answerId} from Supabase:`, error);
    throw error;
  }
};

export const deleteEmailFromSharedRecordingRepo = async (
  recordingId: string,
  email: string
): Promise<void> => {
  const client = await pool.connect();
  try {
    console.log('Deleting email from shared recording:', { recordingId, email });
    await client.query(
      `
      UPDATE shared_recordings
      SET shared_with = array_remove(shared_with, $2)
      WHERE answer_id = $1
      `,
      [recordingId, email]
    );

    await client.query(
      `
      DELETE FROM shared_recordings
      WHERE answer_id = $1 AND (shared_with IS NULL OR array_length(shared_with, 1) = 0)
      `,
      [recordingId]
    );
  } finally {
    client.release();
  }
};

export const addParticipantRepo = async (
  ownerId: string,
  answerId: string,
  email: string
): Promise<'already-exists' | 'appended' | 'created'> => {
  console.log('repository Adding participant:', { ownerId, answerId, email });

  const existing = await pool.query(
    `SELECT id, shared_with FROM shared_recordings WHERE answer_id = $1`,
    [answerId]
  );

  if (existing.rows.length > 0) {
    const sharedWith = existing.rows[0].shared_with;
    const alreadyExists = sharedWith.includes(email);

    if (alreadyExists) {
      return 'already-exists';
    }

    await pool.query(
      `UPDATE shared_recordings SET shared_with = array_append(shared_with, $1) WHERE id = $2`,
      [email, existing.rows[0].id]
    );

    return 'appended';
  } else {
    await pool.query(
      `INSERT INTO shared_recordings (id, owner_id, answer_id, shared_with) VALUES (gen_random_uuid(), $1, $2, ARRAY[$3])`,
      [ownerId, answerId, email]
    );

    return 'created';
  }
};
