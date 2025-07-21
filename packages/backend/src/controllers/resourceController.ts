// import { Request, Response } from 'express';
// import { v2 as cloudinary } from 'cloudinary';
// import { Pool } from 'pg';
// import { pool } from '../config/dbConnection';

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// export const uploadRecording = async (req: Request, res: Response) => {
//   try {
//     const userId = req.body.userId;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const uploadStream = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: 'auto',
//             folder: 'recordings',
//           },
//           (error, result) => {
//             if (error || !result) {
//               reject(error);
//             } else {
//               resolve(result);
//             }
//           }
//         );
//         stream.end(file.buffer);
//       });
//     };

//     const result = await uploadStream();

//     const fileUrl = (result as any).secure_url;

//     const query = `

//       INSERT INTO "resources" (id, title, type, description, "file_url", "user_id", "created_dat")

//       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())
//     `;
//     const values = [
//       req.body.title || 'Recording',
//       'link',
//       req.body.description || '',
//       fileUrl,
//       userId,
//     ];

//     await pool.query(query, values);

//     res.status(201).json({ message: 'Recording uploaded successfully', url: fileUrl });

//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };


// export const uploadRecording = async (req: Request, res: Response) => {
//   try {
//     const userId = req.body.userId;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // העלאה ל־Cloudinary
//     const uploadResult = await cloudinary.uploader.upload_stream(
//       {
//         resource_type: 'auto',
//         folder: 'recordings',
//       },
//       async (error, result) => {
//         if (error || !result) {
//           return res.status(500).json({ message: 'Cloud upload failed', error });
//         }

//         const fileUrl = result.secure_url;

//         // שמירה לטבלת Resource
//         const query = `
//           INSERT INTO "Resource" (id, title, type, description, "fileUrl", "user_id", "createdAt")
//           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())
//         `;
//         const values = [
//           req.body.title || 'Recording',
//           'link', // או 'audio' אם יש לך ENUM מתאים
//           req.body.description || '',
//           fileUrl,
//           userId,
//         ];

//         await pool.query(query, values);

//         res.status(201).json({ message: 'Recording uploaded successfully', url: fileUrl });
//       }
//     );

//     // חייבים להזרים את הקובץ
//     if (file && uploadResult) {
//       uploadResult.end(file.buffer);
//     }

//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };

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
<<<<<<< HEAD
=======


>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
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

<<<<<<< HEAD
    // Return the secure URL from Cloudinary
    res.status(201).json({ url: uploadResult.secure_url });
=======
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
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error occurred' });
  }
<<<<<<< HEAD
};






=======
};
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
