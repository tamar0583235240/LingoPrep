import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

console.log('Database user:', process.env.PGUSER);
console.log('Database host:', process.env.PGHOST);
console.log('Database name:', process.env.PGDATABASE);
console.log('Database password:', process.env.PGPASSWORD);
console.log('Database port:', process.env.PGPORT);

export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
 });
console.log('Database connection pool created');
