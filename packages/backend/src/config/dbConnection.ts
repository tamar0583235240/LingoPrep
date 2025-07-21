// src/config/pgClient.ts

import dotenv from 'dotenv';
import { Pool } from 'pg';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// הגדרת חיבור PostgreSQL
export const pool = new Pool({
  host: process.env.DB_HOST || process.env.PGHOST,
  port: Number(process.env.DB_PORT || process.env.PGPORT),
  user: process.env.DB_USER || process.env.PGUSER,
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
  database: process.env.DB_NAME || process.env.PGDATABASE,
});

if (process.env.JEST_WORKER_ID === undefined) {
  pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch((error) => console.error('❌ PostgreSQL connection failed:', error));
}

// בדיקת חיבור ל-PostgreSQL רק בסביבת פיתוח
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('🕒 PostgreSQL time:', res.rows[0].now);
  } catch (error) {
    console.error('❌ PostgreSQL test query failed:', error);
  }
}

if (process.env.NODE_ENV !== 'test') {
  testConnection();
}

// הגדרת חיבור Supabase
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SERVICE_ROLE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
console.log('✅ Supabase client created');
