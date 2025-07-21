import fs from 'fs/promises';
import path from 'path';

export async function deleteFileIfExists(filePath: string) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.warn(`File not found or already deleted: ${filePath}`);
  }
}
