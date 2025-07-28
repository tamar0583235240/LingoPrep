
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { Pool } from 'pg';
import { pool } from '../config/dbConnection';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
console.log('PGPASSWORD:', process.env.PGPASSWORD);


export const uploadRecording = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'recordings',
          },
          (error, result) => {
            if (error || !result) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(file.buffer);
      });
    };

    const result = await uploadStream();

    const fileUrl = (result as any).secure_url;

 const query = `
  INSERT INTO "resources" (id, user_id, title, type, description, "file_url", "created_at")
  VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())
`;

const values = [
  userId,                     // $1
  req.body.title || 'Recording',  // $2
  'link',                    // $3
  req.body.description || '', // $4
  fileUrl                    // $5
];


    await pool.query(query, values);

    res.status(201).json({ message: 'Recording uploaded successfully', url: fileUrl });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};