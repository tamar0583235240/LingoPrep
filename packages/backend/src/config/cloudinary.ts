import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadFileToCloudinary = (
  file: Express.Multer.File,
  folder: string
) => {
  let resourceType: "image" | "video" | "raw" = "raw";

  if (file.mimetype.startsWith("image/")) {
    resourceType = "image";
  } else if (file.mimetype.startsWith("video/")) {
    resourceType = "video";
  } else {
    resourceType = "raw";
  }

  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder,
        use_filename: true,
        unique_filename: true,
        overwrite: true,
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
export const deleteFileFromCloudinary = (publicId: string) => {
  return new Promise<void>((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export default cloudinary;
