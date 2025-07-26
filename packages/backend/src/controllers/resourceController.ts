import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { pool } from '../config/dbConnection';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadRecording = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const file = req.file;
    const title = req.body.title || 'Untitled Recording';
    const description = req.body.description || '';

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
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
              reject(error || new Error('Upload failed'));
            } else {
              resolve(result);
            }
          }
        );

        // Pass the buffer to the upload stream
        stream.end(file.buffer);
      });
    };

    const uploadResult: any = await uploadStream();

    // שמירת הפרטים במסד הנתונים
    const query = `
      INSERT INTO resources (user_id, title, description, url, type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [userId, title, description, uploadResult.secure_url, 'recording'];
    const dbResult = await pool.query(query, values);

    res.json({
      message: 'File uploaded successfully',
      url: uploadResult.secure_url,
      resource: dbResult.rows[0]
    });

  } catch (error) {
    console.error('Error in uploadRecording:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};

export const getAllResources = async (_req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM resources ORDER BY created_at DESC';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in getAllResources:', error);
    res.status(500).json({ message: 'Error fetching resources', error: error.message });
  }
};

export const getResourceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM resources WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error in getResourceById:', error);
    res.status(500).json({ message: 'Error fetching resource', error: error.message });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const query = `
      UPDATE resources
      SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(query, [title, description, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error in updateResource:', error);
    res.status(500).json({ message: 'Error updating resource', error: error.message });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get resource URL before deletion
    const getQuery = 'SELECT url FROM resources WHERE id = $1';
    const getResult = await pool.query(getQuery, [id]);

    if (getResult.rows.length === 0) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const resourceUrl = getResult.rows[0].url;

    // Delete from Cloudinary
    const publicId = resourceUrl.split('/').slice(-1)[0].split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    // Delete from database
    const deleteQuery = 'DELETE FROM resources WHERE id = $1 RETURNING *';
    const deleteResult = await pool.query(deleteQuery, [id]);

    res.json({ message: 'Resource deleted successfully', resource: deleteResult.rows[0] });
  } catch (error) {
    console.error('Error in deleteResource:', error);
    res.status(500).json({ message: 'Error deleting resource', error: error.message });
  }
};

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



//למחיקה!
// export const uploadRecording = async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const userId = req.body.userId;
//     if (!userId) {
//       return res.status(400).json({ error: 'User ID is required' });
//     }

//     // Upload to Cloudinary
//     const uploadResult: any = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: 'auto',
//           folder: 'recordings',
//         },
//         (error, result) => {
//           if (error || !result) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//       stream.end(req.file.buffer);
//     });

//     if (!uploadResult || !uploadResult.secure_url) {
//       throw new Error('Failed to get secure URL from Cloudinary');
//     }

//     const query = `
//       INSERT INTO "resources" (id, user_id, title, type, description, "file_url", "created_at")
//       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())
//       RETURNING *
//     `;

//     const values = [
//       userId,                         // $1
//       req.body.title || 'Recording',  // $2
//       'recording',                    // $3
//       req.body.description || '',     // $4
//       uploadResult.secure_url         // $5
//     ];

//     const dbResult = await pool.query(query, values);

//     res.status(201).json({
//       message: 'Recording uploaded successfully',
//       url: uploadResult.secure_url,
//       resource: dbResult.rows[0]
//     });

//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error occurred' });
//   }
// };
