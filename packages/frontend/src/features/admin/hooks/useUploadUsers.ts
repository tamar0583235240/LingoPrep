import { useState } from "react";
import { useUploadUsersExcelMutation } from "../services/adminApi";

// הטיפוס של התגובה מהשרת
type UploadResponse = {
  message: string;
  successCount: number;
  skippedCount: number;
  skippedUsers: {
    email?: string;
    first_name?: string;
    last_name?: string;
    reason: string;
  }[];
};

export const useUploadUsers = () => {
  const [uploadUsersExcel, { isLoading }] = useUploadUsersExcelMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const upload = async (file: File): Promise<UploadResponse> => {
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadUsersExcel(formData).unwrap();
      console.log("תגובה מהשרת", response);
      return response;
    } catch (err: any) {
      console.error("שגיאה בהעלאה:", err);
      setErrorMessage(err?.data || "שגיאה בהעלאת הקובץ");
      throw err;
    }
  };

  return {
    upload,
    loading: isLoading,
    error: errorMessage,
    successMessage,
  };
};
