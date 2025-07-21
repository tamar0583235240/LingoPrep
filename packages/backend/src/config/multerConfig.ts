const multer = require('multer');
const path = require('path');
const fs = require('fs');

// וידוא שתיקיית uploads קיימת
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// הגדרת אחסון עבור multer
const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => {
    cb(null, uploadsDir);
  },
  filename: (_req: any, file: any, cb: any) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname) || '.wav'; // ברירת מחדל ל-wav אם אין סיומת
    console.log('📂 Saving file as:', `audio-${uniqueSuffix}${ext}`);
    cb(null, `audio-${uniqueSuffix}${ext}`);
  }
});

// פילטר קבצים שמאפשר קבצי אודיו
const fileFilter = (_req: any, file: any, cb: any) => {
  console.log('🎵 Received file:', file.originalname, 'type:', file.mimetype);
  
  // מאפשר סוגי קבצים נפוצים של אודיו כולל WAV
  const allowedMimeTypes = [
    'audio/wav',
    'audio/wave',
    'audio/x-wav',
    'audio/webm',
    'audio/ogg',
    'application/octet-stream' // לפעמים WAV מגיע עם MIME type זה
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.error('❌ Invalid file type:', file.mimetype);
    cb(new Error('Only audio files are allowed'));
  }
};

// הגדרות נוספות
const limits = {
  fileSize: 10 * 1024 * 1024 // מגבלת גודל של 10MB
};

// יצירת middleware של multer
const upload = multer({
  storage,
  fileFilter,
  limits
});

export default upload;
