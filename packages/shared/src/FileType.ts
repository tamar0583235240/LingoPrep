// src/shared/utils/FileType.ts

export const getFileType = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf': return 'pdf';
    case 'doc':
    case 'docx': return 'word';
    case 'jpg':
    case 'jpeg':
    case 'png': return 'image';
    case 'mp4':
    case 'webm': return 'video';
    case 'mp3':
    case 'wav': return 'audio';
    default: return 'other';
  }
};

export const fileTypeToThumbnail: Record<string, string> = {
  pdf: '/thumbnails/pdf.png',
  word: '/thumbnails/word.png',
  image: '/thumbnails/image.png',
  video: '/thumbnails/video.png',
  audio: '/thumbnails/audio.png',
  other: '/thumbnails/file.png',
};

// export default getFileType;
