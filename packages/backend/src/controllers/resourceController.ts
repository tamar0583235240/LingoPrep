import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { Pool } from 'pg';
import { pool } from '../config/dbConnection';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
export const uploadRecording = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
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
      stream.end(req.file.buffer);
    });

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Failed to get secure URL from Cloudinary');
    }

    // Return the secure URL from Cloudinary
    res.status(201).json({ url: uploadResult.secure_url });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
};






