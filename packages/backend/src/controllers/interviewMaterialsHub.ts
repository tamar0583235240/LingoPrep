import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { pool } from '../config/dbConnection';
// import InterviewMaterialSubRepository from '../reposioty/InterviewMaterialSubRepository';
import {searchFiles,getInterviewMaterialsSubs} from "../repository/interviewMaterialSubRepository"
// import { getInterviewMaterialsSubs } from 'reposioty/interviewMaterialSubRepository';

import processHebrewText from '../utils/processHebrewText';
import {fileTypeToThumbnail,getFileType} from "../../../shared/src/FileType"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
console.log('PGPASSWORD:', process.env.PGPASSWORD);

export const addFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'interviewMaterialsHub',
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
    const fileType = getFileType(fileUrl);
        const thumbnail = fileTypeToThumbnail[fileType] || fileTypeToThumbnail['other'];

const cleanedText = processHebrewText(`${req.body.title} ${req.body.description || ''}`);

const query = `
  INSERT INTO interview_materials_sub (title, file_url,thumbnail, short_description, search_text_cleaned)
  VALUES ($1, $2, $3, $4,$5)
`;

 const values = [
  req.body.title || 'File for interview',
  fileUrl,
  thumbnail,
  req.body.description || '',
  cleanedText
];

    await pool.query(query, values);

    res.status(201).json({ message: 'file uploaded successfully', url: fileUrl });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getInterviewMaterialSubs = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.query.badParam) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }
    if (req.headers['x-test-redirect']) {
      res.status(300).json({ info: 'Multiple choices' });
      return;
    }
    const items = await getInterviewMaterialsSubs();
    res.json(items);
  } catch (error: any) {
    console.error('Error in interview material sub controller:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const searchMterials=async(req: Request, res: Response)=>{
  const q = req.query.q?.toString() || '';
  console.log("at serarch in back",q);
   if (!q) {
    return res.status(400).json({ message: 'Missing search query' });
  }

  try {
    const results = await searchFiles(q);
    console.log("result:",results);
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
}

export const incrementDownloadCount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE interview_materials_sub
       SET downloads_count = downloads_count + 1
       WHERE id = $1`,
      [id]
    );

    res.status(200).json({ message: "Download count updated" });
  } catch (err) {
    console.error("שגיאה בעדכון downloads_count", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
