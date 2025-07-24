import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

dotenv.config();

console.log('Database user:', process.env.DB_USER);
console.log('Database host:', process.env.DB_HOST);
console.log('Database name:', process.env.DB_NAME);
console.log('Database password:', process.env.DB_PASSWORD);
console.log('Database port:', process.env.DB_PORT);

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

if (process.env.JEST_WORKER_ID === undefined) {
  pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(() => console.error('❌ Connection error'));
}
