import { v2 as cloudinary } from 'cloudinary';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// קובץ לבדיקה
const audioPath = path.resolve(__dirname, 'test-audio.mp3'); // ודאי שהקובץ הזה קיים בתיקיה

// קונפיגורציית Cloudinary
cloudinary.config({
  cloud_name: 'CLOUD_NAME',
  api_key: 'API_KEY',
  api_secret: 'API_SECRET',
});

// קונפיגורציית Postgres
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lingo-prep',
  password: 'huser',
  port: 5432,
});

async function testUploadToCloudAndDb() {
  const client = await pool.connect();

  try {
    // העלאה ל־Cloudinary
    const result = await cloudinary.uploader.upload(audioPath, {
      resource_type: 'video',
      folder: 'recordings',
    });

    console.log('✅ העלאה הצליחה:', result.secure_url);

    // קבלת user קיים
    const userRes = await client.query('SELECT id FROM users LIMIT 1');
    const userId = userRes.rows[0]?.id;

    if (!userId) throw new Error('לא נמצא משתמש');

    // הכנסת שורה ל־DB
    const insertRes = await client.query(
      `INSERT INTO "Resource" (id, title, type, description, "fileUrl", "createdAt", user_id)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), $5) RETURNING *`,
      ['בדיקת הקלטה', 'link', 'הקלטה לבדיקה', result.secure_url, userId]
    );

    console.log('✅ נוסף ל־DB:', insertRes.rows[0]);
  } catch (err) {
    console.error('❌ שגיאה:', err);
  } finally {
    client.release();
    pool.end();
  }
}

testUploadToCloudAndDb();
