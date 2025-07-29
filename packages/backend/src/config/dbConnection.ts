import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';


export const pool = new Pool({
  // שרי עשתה בדרך אחרת מכולם כאן לשנות אחכ למה שכולם
  //זה מתחבר אלי לפי קובץ env
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
 });
console.log('Database connection pool created');

