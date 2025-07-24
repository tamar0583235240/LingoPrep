import { pool } from "../config/dbConnection";

export const getPublicProfileBySlug = async (slug: string) => {
  try {
    const userResult = await pool.query(
      "SELECT id, first_name, last_name FROM users WHERE slug = $1 LIMIT 1",
      [slug]
    );

    if (userResult.rowCount === 0) {
      throw new Error("User not found");
    }

    const userId = userResult.rows[0].id;

    const safeQuery = async <T = any>(query: string, params: any[]): Promise<T[]> => {
      try {
        console.log("Executing query:", query, "with params:", params);
        const result = await pool.query(query, params);
        return result.rows;
      } catch (err) {
        console.error("Query failed:", query, err);
        return [];
      }
    };
    console.log("Fetching public profile for user ID:", userId);

    const [profileRows, education, expertise, personalProjects, workExperiences] = await Promise.all([
      safeQuery(
        "SELECT image_url, location, external_links, status, preferred_job_type FROM profiles WHERE user_id = $1 AND is_public = true",
        [userId]
      ),
      safeQuery(
        "SELECT institution_name, type, title, field_of_study, start_date, end_date, description FROM education_entries WHERE user_id = $1 AND is_public = true",
        [userId]
      ),
      safeQuery(
        `SELECT category, name, level FROM expertise_skills WHERE user_id = $1 AND is_public = true`,
        [userId]
      ),
      safeQuery(
        "SELECT title, description, demo_url, code_url, thumbnail_url, tags, status FROM personal_projects WHERE user_id = $1 AND is_public = true",
        [userId]
      ),
      safeQuery(
        "SELECT company_name, position, description, start_date, end_date FROM work_experiences WHERE user_id = $1 AND is_public = true",
        [userId]
      )
    ]);

    return {
      first_name: userResult.rows[0].first_name,
      last_name: userResult.rows[0].last_name,
      ...(profileRows[0] || {}),
      education,
      expertise,
      personal_projects: personalProjects,
      work_experience: workExperiences,
    };
  } catch (error) {
    console.error("Error fetching public profile:", error);
    throw new Error("Failed to fetch public profile");
  }

};
