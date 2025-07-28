import { Request, Response } from "express";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../config/cloudinary";
import * as interviewMaterialSubRepository from "../reposioty/interviewMaterialSubRepository";

//getting all interview material subs
const getInterviewMaterialSub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items =
      await interviewMaterialSubRepository.getInterviewMaterialsSubs();
    const itemsWithUrls = items.map((item) => ({
      ...item,
      thumbnailUrl: item.thumbnail || null,
      fileUrl: item.fileUrl || null,
      originalFileName: item.originalFileName || null,
    }));
    res.status(200).json(itemsWithUrls);
  } catch (error) {
    console.error("Error in interview material sub controller:", error);
    res.status(500).json({ message: "שגיאה בשליפת חומרי ריאיון" });
  }
};

//adding a new interview material sub
const addInterviewMaterialSub = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const thumbnailFile = files?.thumbnail?.[0];
    const file = files?.file?.[0];
    const originalFileName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );

    if (!file) {
      res.status(400).json({ message: "לא הועלה קובץ" });
      return;
    }

    let thumbnailUrl = "";
    if (thumbnailFile) {
      const thumbnailResult = await uploadFileToCloudinary(
        thumbnailFile,
        "interviewMaterialsHub/thumbnails"
      );
      thumbnailUrl = thumbnailResult.secure_url;
    }

    const fileResult = await uploadFileToCloudinary(
      file,
      "interviewMaterialsHub/files"
    );

    const created =
      await interviewMaterialSubRepository.createInterviewMaterialSub(
        req.body.title,
        thumbnailUrl,
        req.body.short_description,
        fileResult.secure_url,
        originalFileName
      );

    res.status(201).json({
      message: "הפריט נשמר בהצלחה",
      data: created,
    });
  } catch (err) {
    console.error("Upload error:", err);
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    res.status(500).json({ message: "שגיאה בשרת", error: err });
  }
};

//updating an existing interview material sub
const updateInterviewMaterialSub = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, short_description, existingFileUrl } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  try {
    const existingMaterial =
      await interviewMaterialSubRepository.getInterviewMaterialSubById(id);
    if (!existingMaterial) {
      return res.status(404).json({ message: "חומר ריאיון לא נמצא" });
    }
    const newTitle = title?.trim();
    const newShortDesc = short_description?.trim();
    if (!newTitle || !newShortDesc) {
      return res.status(400).json({ message: "כותרת ותיאור קצר הם שדות חובה" });
    }

    console.log("Existing Material:", existingMaterial);
    let updatedFileUrl = existingMaterial.fileUrl;
    let updatedOriginalFileName = existingMaterial.originalFileName;

    if (files?.file?.[0]) {
      const publicId = extractPublicId(existingMaterial.fileUrl);
      if (publicId) {
        await deleteFileFromCloudinary(
          `interviewMaterialsHub/files/${publicId}`
        );
      }
      const fileUpload = await uploadFileToCloudinary(
        files.file[0],
        "interviewMaterialsHub/files"
      );
      updatedFileUrl = fileUpload.secure_url;
      updatedOriginalFileName = Buffer.from(
        files.file[0].originalname,
        "latin1"
      ).toString("utf8");
    } else if (existingFileUrl) {
      // If existingFileUrl is provided, use it instead of the current file URL
      updatedFileUrl = existingFileUrl;
      updatedOriginalFileName = existingMaterial.originalFileName;
    }
    if (!updatedFileUrl) {
      return res
        .status(400)
        .json({ message: "לא ניתן לעדכן חומר ריאיון ללא קובץ מצורף" });
    }

    let updatedThumbnail = existingMaterial.thumbnail;
    if (files?.thumbnail?.[0]) {
      const publicId = extractPublicId(existingMaterial.thumbnail);
      if (publicId) {
        await deleteFileFromCloudinary(
          `interviewMaterialsHub/thumbnails/${publicId}`
        );
      }
      const thumbUpload = await uploadFileToCloudinary(
        files.thumbnail[0],
        "interviewMaterialsHub/thumbnails"
      );
      updatedThumbnail = thumbUpload.secure_url;
    }

    console.log("Before update", {
      existingMaterialOriginalFileName: existingMaterial.originalFileName,
      updatedOriginalFileName,
    });

    const updated =
      await interviewMaterialSubRepository.updateInterviewMaterialSub(
        id,
        newTitle,
        newShortDesc,
        updatedThumbnail,
        updatedFileUrl,
        updatedOriginalFileName
      );
    return res.json(updated);
  } catch (error) {
    console.error("Error updating interview material:", error);
    return res.status(500).json({ message: "שגיאה בעדכון" });
  }
};

const extractPublicId = (url?: string | null): string | null => {
  if (typeof url !== "string") return null;
  const match = url.match(
    /\/upload\/(?:v\d+\/)?(.+)\.(pdf|doc|docx|mp4|avi|mp3|wav)$/i
  );
  return match ? match[1] : null;
};

const deleteInterviewMaterialSub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const existingMaterialSub =
      await interviewMaterialSubRepository.getInterviewMaterialSubById(id);
    if (!existingMaterialSub) {
      res.status(404).json({ message: "פריט לא נמצא" });
      return;
    }

    const extractPublicId = (url: string) => {
      const match = url.match(/\/([^/]+)\.[a-zA-Z]+$/);
      return match?.[1];
    };
    if (existingMaterialSub.thumbnail) {
      const thumbId = extractPublicId(existingMaterialSub.thumbnail);
      if (thumbId) {
        await deleteFileFromCloudinary(
          `interviewMaterialsHub/thumbnails/${thumbId}`
        );
      }
    }

    if (existingMaterialSub.fileUrl) {
      const fileId = extractPublicId(existingMaterialSub.fileUrl);
      if (fileId) {
        await deleteFileFromCloudinary(`interviewMaterialsHub/files/${fileId}`);
      }
    }

    await interviewMaterialSubRepository.deleteInterviewMaterialSub(id);

    res.json({ message: "הפריט נמחק בהצלחה" });
  } catch (error) {
    console.error("שגיאה במחיקת פריט:", error);
    res.status(500).json({ error: "שגיאה במחיקה" });
  }
};

export {
  getInterviewMaterialSub,
  updateInterviewMaterialSub,
  addInterviewMaterialSub,
  deleteInterviewMaterialSub,
};
