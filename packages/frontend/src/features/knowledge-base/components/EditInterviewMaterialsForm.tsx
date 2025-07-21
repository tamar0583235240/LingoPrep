import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { allowedTypes } from "../types/fileTypes";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { cn } from "../../../shared/utils/cn";
import { useEffect, useMemo, useState } from "react";
import { useUpdateInterviewMaterialMutation } from "../../../shared/api/interviewMaterialsApi";
import { Paragraph } from "../../../shared/ui/typography";
import { FiDownload } from "react-icons/fi";

// סכמת ולידציה
const schema = yup
  .object({
    title: yup.string().required("שדה חובה"),
    shortDescription: yup.string().required("שדה חובה"),
    thumbnail: yup
      .mixed<FileList>()
      .nullable()
      .test("imageType", "רק קובץ תמונה תקף", (value) => {
        if (!value || value.length === 0) return true;
        return value[0].type.startsWith("image/");
      }),
    file: yup
      .mixed<FileList>()
      .nullable()
      .test("validType", "סוג קובץ לא נתמך", (value) => {
        if (!value || value.length === 0) return true;
        return allowedTypes.includes(value[0].type);
      }),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;
interface EditInterviewMaterialsSubFormProps {
  id: string;
  defaultValues: Partial<FormValues>;
  fileUrl?: string;
  thumbnail?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const EditInterviewMaterialsForm = ({
  id,
  defaultValues,
  fileUrl,
  thumbnail,
  onSuccess,
  onCancel,
}: EditInterviewMaterialsSubFormProps) => {
  const [updateMaterial, { isLoading }] = useUpdateInterviewMaterialMutation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const initialValues = useMemo(
    () => ({
      title: defaultValues.title || "",
      shortDescription: defaultValues.shortDescription || "",
      thumbnail: defaultValues.thumbnail || null,
      file: defaultValues.file || null,
    }),
    [defaultValues]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const thumbnailFiles = watch("thumbnail");
  const selectedFile = watch("file");

  const previewThumbnailUrl = useMemo(() => {
    if (thumbnailFiles?.length) {
      return URL.createObjectURL(thumbnailFiles[0]);
    }
    return null;
  }, [thumbnailFiles]);

  useEffect(() => {
    return () => {
      if (previewThumbnailUrl) {
        URL.revokeObjectURL(previewThumbnailUrl);
      }
    };
  }, [previewThumbnailUrl]);

  const thumbnailName =
    thumbnailFiles && thumbnailFiles.length > 0
      ? thumbnailFiles[0].name
      : "לא נבחרה תמונה";
  const selectedFileName =
    selectedFile && selectedFile.length > 0
      ? selectedFile[0].name
      : "לא נבחר קובץ";

  const existingFileName = useMemo(() => {
    if (!fileUrl) return "";
    try {
      return decodeURIComponent(fileUrl.split("/").pop() || "");
    } catch {
      return "קובץ קיים";
    }
  }, [fileUrl]);

  const onValid = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("short_description", data.shortDescription);

    if (data.thumbnail?.length) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    if (data.file?.length) {
      formData.append("file", data.file[0]);
      formData.append("originalFileName", data.file[0].name);
    } else if (fileUrl) {
      // שלח את כתובת הקובץ הקיים כדי שהשרת ידע שיש קובץ
      formData.append("existingFileUrl", fileUrl);
    //   formData.append("existingOriginalFileName", existingFileName);
    }

    try {
      await updateMaterial({ id, formData }).unwrap();
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 4000);
      onSuccess?.();
    } catch (e) {
      console.error("שגיאה בעדכון:", e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-white p-6 rounded-2xl shadow-card space-y-6 text-right"
      dir="rtl"
    >
      {showSuccessMessage && (
        <Paragraph className="text-green-700 font-semibold bg-green-100 p-3 rounded-md border border-green-400 shadow-sm">
          השינויים נשמרו בהצלחה!
        </Paragraph>
      )}

      {/* כותרת */}
      <div>
        <label
          htmlFor="title"
          className="block mb-2 font-semibold text-base text-text-main"
        >
          כותרת
        </label>
        <Input
          id="title"
          {...register("title")}
          className={cn(
            "transition border-[--color-border] focus:border-[--color-primary] focus:ring-[--color-primary]",
            errors.title && "border-red-500 focus:ring-red-500"
          )}
          placeholder="הכנס כותרת..."
          aria-invalid={!!errors.title}
          aria-describedby="title-error"
        />
        {errors.title && (
          <Paragraph id="title-error" className="text-sm text-red-600 mt-1">
            {errors.title.message}
          </Paragraph>
        )}
      </div>

      {/* תיאור קצר */}
      <div>
        <label
          htmlFor="shortDescription"
          className="block mb-2 font-semibold text-base text-text-main"
        >
          תיאור קצר
        </label>
        <textarea
          id="shortDescription"
          {...register("shortDescription")}
          className={cn(
            "w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary] resize-none min-h-[100px] transition",
            errors.shortDescription && "border-red-500 focus:ring-red-500"
          )}
          placeholder="הכנס תיאור קצר..."
          aria-invalid={!!errors.shortDescription}
          aria-describedby="shortDescription-error"
        />
        {errors.shortDescription && (
          <Paragraph
            id="shortDescription-error"
            className="text-sm text-red-600 mt-1"
          >
            {errors.shortDescription.message}
          </Paragraph>
        )}
      </div>

      {/* תמונה ממוזערת להצגה */}
      {(thumbnail || previewThumbnailUrl) && (
        <div>
          <label className="block mb-2 font-semibold text-base text-text-main">
            {previewThumbnailUrl ? "תמונה שנבחרה" : "תמונה קיימת"}
          </label>
          <img
            src={previewThumbnailUrl || thumbnail!}
            alt="תמונה ממוזערת"
            className="max-h-48 max-w-full rounded-md border border-border object-contain shadow-sm mx-auto"
            style={{ aspectRatio: "auto" }}
          />
        </div>
      )}

      {/* תמונה חדשה */}
      <div>
        <label
          htmlFor="thumbnail"
          className="block mb-2 font-semibold text-base text-text-main"
        >
          תמונה ממוזערת (אופציונלי)
        </label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("thumbnail")?.click()}
            className="flex-1"
          >
            בחר תמונה
          </Button>
          <span
            className="text-sm text-text-main truncate max-w-xs"
            title={thumbnailName}
          >
            {thumbnailName}
          </span>
        </div>
        <input
          id="thumbnail"
          type="file"
          accept="image/*"
          {...register("thumbnail")}
          className="hidden"
          aria-invalid={!!errors.thumbnail}
          aria-describedby="thumbnail-error"
        />
        {errors.thumbnail && (
          <Paragraph id="thumbnail-error" className="text-sm text-red-600 mt-1">
            {errors.thumbnail.message}
          </Paragraph>
        )}
      </div>

      {/* קובץ קיים */}
      {fileUrl && !selectedFile?.length && (
        <div className="flex items-center gap-2 border p-3 rounded-md bg-gray-50 max-w-md shadow-inner">
          <FiDownload className="text-gray-600" />
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm truncate max-w-full"
            title={existingFileName}
          >
            {existingFileName}
          </a>
        </div>
      )}

      {/* העלאת קובץ חדש */}
      <div>
        <label
          htmlFor="file"
          className="block mb-2 font-semibold text-base text-text-main"
        >
          צרף קובץ (PDF, Word, אודיו וכו’)
        </label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("file")?.click()}
            className="flex-1"
          >
            בחר קובץ
          </Button>
          <span
            className="text-sm text-text-main truncate max-w-xs"
            title={selectedFileName}
          >
            {selectedFileName}
          </span>
        </div>
        <input
          id="file"
          type="file"
          {...register("file")}
          className="hidden"
          aria-invalid={!!errors.file}
          aria-describedby="file-error"
        />
        {errors.file && (
          <Paragraph id="file-error" className="text-sm text-red-600 mt-1">
            {errors.file.message}
          </Paragraph>
        )}
      </div>

      {/* כפתורים */}
      <div className="flex gap-6 justify-between">
        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          variant="primary-dark"
          className="flex-1"
        >
          {isLoading ? "שומר..." : "שמור שינויים"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              onCancel();
            }}
            className="flex-1"
          >
            ביטול
          </Button>
        )}
      </div>
    </form>
  );
};
