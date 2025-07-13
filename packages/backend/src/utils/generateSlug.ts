import { QueryResult } from 'pg';
import { pool } from '../config/dbConnection';
import { slugify } from 'transliteration';

export const generateUniqueSlug = async (
    firstName: string,
    lastName: string
): Promise<string> => {
    const baseSlug = slugify(`${firstName}-${lastName}`.toLowerCase());
    let slug = baseSlug;
    let counter = 1;
    while (await slugExists(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    return slug;
};

const slugExists = async (slug: string): Promise<boolean> => {
    const result: QueryResult<any> = await pool.query(
        'SELECT 1 FROM users WHERE slug = $1 LIMIT 1',
        [slug]
    );
    return result.rowCount! > 0;
};
