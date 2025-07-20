import { pool } from '../config/dbConnection';
import { InterviewMaterialsSub } from '../interfaces/entities/InterviewMaterialsSub';

const getInterviewMaterialSubs = async (): Promise<InterviewMaterialsSub[]> => {
    try {
        const result = await pool.query('SELECT * FROM interview_materials_sub');
        return result.rows as InterviewMaterialsSub[];
    } catch (error) {
        console.error('Error fetching AIInsight from PostgreSQL:', error);
        throw error;
    }
};

const getInterviewMaterialSubById = async (id: string): Promise<InterviewMaterialsSub | null> => {
    try {
        const result = await pool.query('SELECT * FROM interview_materials_sub WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching AIInsight from PostgreSQL:', error);
        throw error;
    }
};

const updateInterviewMaterialSub = async (
    id: string,
    title: string,
    short_description: string,
    thumbnail: string,
    file_url: string
): Promise<InterviewMaterialsSub> => {
    try {
        const query = `
    UPDATE interview_materials_sub
    SET title = $1,
        short_description = $2,
        thumbnail = $3,
        file_url = $4
    WHERE id = $5
    RETURNING *;
`;
        const values = [title, short_description, thumbnail, file_url, id];
        const result = await pool.query(query, values);
        return result.rows[0] as InterviewMaterialsSub;
    } catch (error) {
        console.error('Error updating interview material sub:', error);
        throw error;
    }
}

const createInterviewMaterialSub = async (
    title: string,
    thumbnail: string,
    short_description: string,
    file_url: string
): Promise<InterviewMaterialsSub> => {
    try {
        const query = `
            INSERT INTO interview_materials_sub (title, thumbnail, short_description, file_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [title, thumbnail, short_description, file_url];
        const result = await pool.query(query, values);
        return result.rows[0] as InterviewMaterialsSub;
    } catch (error) {
        console.error('Error creating interview material sub:', error);
        throw error;
    }
}

export default { getInterviewMaterialSubs, getInterviewMaterialSubById, updateInterviewMaterialSub, createInterviewMaterialSub };