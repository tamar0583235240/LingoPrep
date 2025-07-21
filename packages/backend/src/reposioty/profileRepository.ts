import { pool } from "../config/dbConnection";
export const getAllProfiles = async () => {
  const result = await pool.query(`
    SELECT profiles.*, users.first_name, users.last_name, users.email, users.phone
    FROM profiles
    JOIN users ON profiles.user_id = users.id
    ORDER BY profiles.created_at DESC
  `);
  return result.rows;
};
export const getProfileById = async (profileId: string) => {
  const result = await pool.query(
    `
    SELECT profiles.*, users.first_name, users.last_name, users.email, user.phone
    FROM profiles
    JOIN users ON profiles.user_id = users.id
    WHERE profiles.id = $1
  `,
    [profileId]
  );
  return result.rows[0] || null;
};
export const getProfileByUserId = async (userId: string) => {
  const result = await pool.query(
    `
    SELECT profiles.*, users.first_name, users.last_name, users.email, users.phone
    FROM profiles
    JOIN users ON profiles.user_id = users.id
    WHERE profiles.user_id = $1
  `,
    [userId]
  );
  return result.rows[0] || null;
};
export const createProfile = async (userId: string, data: any) => {
  const {
    image_url,
    location,
    external_links,
    status,
    preferred_job_type,
    is_public,
  } = data;
  const result = await pool.query(
    `
    INSERT INTO profiles (
      user_id, image_url, location, external_links, status, preferred_job_type, is_public
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,
    [
      userId,
      image_url,
      location,
      JSON.stringify(external_links || []),
      status,
      preferred_job_type,
      is_public,
    ]
  );
  return result.rows[0];
};
export const updateProfile = async (profileId: string, data: any) => {
  const {
    image_url,
    location,
    external_links,
    status,
    preferred_job_type,
    is_public,
  } = data;
  const cleanedLinks = Array.isArray(external_links)
    ? external_links
        .filter((link) => link.url?.trim())
        .map((link) => ({
          url: link.url.trim(),
          label: link.label.trim(),
        }))
    : [];
  const result = await pool.query(
    `
    UPDATE profiles SET
      image_url = $1,
      location = $2,
      external_links = $3,
      status = $4,
      preferred_job_type = $5,
      updated_at = CURRENT_TIMESTAMP,
      is_public = $6
    WHERE id = $7
    RETURNING *;
  `,
    [
      image_url,
      location,
      JSON.stringify(cleanedLinks),
      status,
      preferred_job_type,
      is_public,
      profileId,
    ]
  );
  return result.rows[0] || null;
};