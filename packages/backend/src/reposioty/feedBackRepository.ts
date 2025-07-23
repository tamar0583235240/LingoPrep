import {pool} from '../config/dbConnection';
import { Feedback } from "../interfaces/entities/Feedback";
import { getSharedRecordingIdByAnswerId } from './sharedRecordingRpository';
export const getFeedbackByAnswerCode= async (answerCode:string): Promise<Feedback[]> => {
  
  try{

    const query = 'SELECT id, shared_recording_id, given_by_user_id, comment,rating, created_dat,answer_code FROM feedback WHERE answer_code = \$1';
    const values = [answerCode];
    const { rows } = await pool.query(query,values); 
    return rows as Feedback[];
   
  }catch (error) {
    console.error("Error fetching answers from Supabase:", error);
    throw error;
  }
}

export const getFeedbackesByanswerIdRepo = async (answerId:string): Promise<Feedback[]> => {

    try {
        const sharedRecordingId =  await getSharedRecordingIdByAnswerId(answerId);
        const data = await pool.query(`SELECT * FROM feedback WHERE shared_recording_id = $1` , [sharedRecordingId] );   

        console.log(data.rows.length);
        
        return data.rows as Feedback[];
    }
    catch (error) {
        console.error(`Error fetching feedbackes by sharedRecordingId: ${answerId} from Supabase:`, error);
        throw error;
    }

}

export const getAllFeedbacksByUserId = async (userId: string) => {
  const query = `
    SELECT f.*
    FROM feedback f
    JOIN shared_recordings sr ON f.shared_recording_id = sr.id
    WHERE sr.owner_id = $1
    ORDER BY f.created_at DESC
  `;

  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const createFeedbackWithNotificationRepo = async ({
  comment,
  rating,
  answerCodeId,
  givenByUserId,
  sharedRecordingId,
}: {
  comment: string;
  rating: number;
  answerCodeId: string;
  givenByUserId: string;
  sharedRecordingId: string;
}) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const feedbackResult = await client.query(
      `
      INSERT INTO feedback (id, comment, rating, created_at, answer_code, given_by_user_id, shared_recording_id)
      VALUES (gen_random_uuid(), $1, $2, now(), $3, $4, $5)
      RETURNING *;
      `,
      [comment, rating, answerCodeId, givenByUserId, sharedRecordingId]
    );
    const feedback = feedbackResult.rows[0];

    const ownerResult = await client.query(
      `SELECT owner_id FROM shared_recordings WHERE id = $1`,
      [sharedRecordingId]
    );
    if (ownerResult.rowCount === 0) {
      throw new Error('Shared recording not found');
    }
    const ownerId = ownerResult.rows[0].owner_id;

    await client.query(
      `
      INSERT INTO notifications (id, user_id, type, message, is_seen, created_at)
      VALUES (gen_random_uuid(), $1, $2, $3, false, now());
      `,
      [ownerId, 'feedback', 'You received new feedback on your shared recording.']
    );

    await client.query('COMMIT');
    return feedback;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};