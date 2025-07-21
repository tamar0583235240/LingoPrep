import multer from 'multer';
import path from 'path';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/files');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage: fileStorage });
