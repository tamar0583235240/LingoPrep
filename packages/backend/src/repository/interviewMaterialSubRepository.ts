// import { InterviewMaterialsSub } from '@interfaces/entities/InterviewMaterialsSub';
import { pool } from "../config/dbConnection";
import { InterviewMaterialsSub } from "../interfaces/entities/InterviewMaterialsSub";

export const getInterviewMaterialsSubs = async (): Promise<InterviewMaterialsSub[]> => {
  try {
    const result = await pool.query("SELECT * FROM interview_materials_sub");
    console.log(result+"result");
    
    return result.rows as InterviewMaterialsSub[];
  } catch (error) {
    console.error("Error fetching AIInsight from PostgreSQL:", error);
    throw error;
  }
};

export const getInterviewMaterialSubById = async (
  id: string
): Promise<InterviewMaterialsSub | null> => {
  try {
    const result = await pool.query(
      "SELECT * FROM interview_materials_sub WHERE id = $1",
      [id]
    );
    const row = result.rows[0];
    if (!row) return null;

    return {
      id: row.id,
      title: row.title,
      thumbnail: row.thumbnail,
      shortDescription: row.short_description,
      fileUrl: row.file_url,
      originalFileName: row.original_file_name,
      downloadsCount: row.downloads_count,
    };
  } catch (error) {
    console.error("Error fetching interview material sub by ID from PostgreSQL:", error);
    throw error;
  }
};


export const updateInterviewMaterialSub = async (
  id: string,
  title: string,
  short_description: string,
  thumbnail: string,
  file_url: string,
  original_file_name: string
): Promise<InterviewMaterialsSub> => {
  try {
    const query = `
    UPDATE interview_materials_sub
    SET title = $1,
        short_description = $2,
        thumbnail = $3,
        file_url = $4,
        original_file_name = $5
    WHERE id = $6
    RETURNING *;
`;
    const values = [
      title,
      short_description,
      thumbnail,
      file_url,
      original_file_name,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0] as InterviewMaterialsSub;
  } catch (error) {
    console.error("Error updating interview material sub:", error);
    throw error;
  }
};

export const createInterviewMaterialSub = async (
  title: string,
  thumbnail: string,
  short_description: string,
  file_url: string,
  original_file_name: string
): Promise<InterviewMaterialsSub> => {
  try {
    const query = `
      INSERT INTO interview_materials_sub (title, thumbnail, short_description, file_url, original_file_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      title,
      thumbnail,
      short_description,
      file_url,
      original_file_name,
    ];
    const result = await pool.query(query, values);
    return result.rows[0] as InterviewMaterialsSub;
  } catch (error) {
    console.error("Error creating interview material sub:", error);
    throw error;
  }
};
export const deleteInterviewMaterialSub = async (id: string) => {
  try {
    await pool.query("DELETE FROM interview_materials_sub WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting material by ID:", error);
    throw error;
  }
};
 export const searchFiles= async(queryText: string)=> {
  try {
    if (!queryText || !queryText.trim()) {
      // אם אין טקסט חיפוש, נחזיר את כל הרשומות
      const result = await pool.query("SELECT id, title, thumbnail, short_description FROM interview_materials_sub LIMIT 20");
      return result.rows;
    }
    // חיפוש חכם אם document_with_weights לא ריק, אחרת fallback ל-title
    let result;
    if (queryText.length > 1) {
      result = await pool.query(
        `SELECT id, title, thumbnail, short_description,
                ts_rank(coalesce(document_with_weights, to_tsvector('')), to_tsquery('simple', $1)) AS rank
         FROM interview_materials_sub
         WHERE (document_with_weights IS NOT NULL AND document_with_weights @@ to_tsquery('simple', $1))
            OR title ILIKE '%' || $1 || '%'
         ORDER BY rank DESC
         LIMIT 20`,
        [queryText.trim().split(/\s+/).join(' & ')]
      );
    } else {
      result = await pool.query(
        `SELECT id, title, thumbnail, short_description
         FROM interview_materials_sub
         WHERE title ILIKE '%' || $1 || '%'
         LIMIT 20`,
        [queryText]
      );
    }
    return result.rows;
  } catch (error) {
    console.error("Error searching files:", error);
    throw error;
  }
}
