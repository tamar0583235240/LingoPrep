import { ChangeEvent } from "react";
import Swal from "sweetalert2";
import { useUploadUsers } from "../hooks/useUploadUsers";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";

export const UploadUsers = () => {
  const { upload, loading } = useUploadUsers();

  const columnMapping: Record<string, string> = {
    "שם פרטי": "firstName",
    "שם משפחה": "lastName",
    "אימייל": "email",
    "טלפון": "phone",
    "סיסמה": "password",
    "תפקיד": "role",
  };

  // קריאה מהקובץ לקובץ JSON
  const readExcelFile = async (file: File): Promise<any[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
  };

  // מיפוי שמות עמודות מעברית לאנגלית
  const mapUserData = (data: Record<string, any>[]): Record<string, any>[] => {
    return data.map((row) => {
      const newRow: Record<string, any> = {};
      for (const key in row) {
        const mappedKey = columnMapping[key] || key;
        newRow[mappedKey] = row[key];
      }
      return newRow;
    });
  };

  // יצירת קובץ Excel חדש מהמיפוי
  const generateExcelFile = (data: Record<string, any>[], originalFile: File): File => {
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Users");

    const newBuffer = XLSX.write(newWorkbook, { type: "array", bookType: "xlsx" });
    return new File([newBuffer], "mapped-users.xlsx", { type: originalFile.type });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    e.target.value = "";

    const confirmResult = await Swal.fire({
      title: "?האם לעדכן משתמשים",
      text: "הפעולה תעלה את המשתמשים מהקובץ למערכת",
      icon: "question",
      iconColor: "#64748B",
      showCancelButton: true,
      confirmButtonText: "כן, עדכן",
      cancelButtonText: "ביטול",
      confirmButtonColor: "#00B894",
      cancelButtonColor: "#64748B",
    });

    if (!confirmResult.isConfirmed) return;

    Swal.fire({
      title: "טוען... אנא המתן",
      html: '<div class="spinner"></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: (popup) => {
        const confirmButton = popup.querySelector<HTMLButtonElement>('.swal2-confirm');
        if (confirmButton) {
          Swal.showLoading(confirmButton);
        }
      },
    });

    try {
      const rawData = await readExcelFile(file);
      const mappedData = mapUserData(rawData);
      const mappedFile = generateExcelFile(mappedData, file);
      const result = await upload(mappedFile);

      Swal.close();

      // ואז להמשיך להראות את חלון ההצלחה / כישלון:
      if (result.successCount === 0) {
        Swal.fire({
          icon: "error",
          title: "לא הועלו משתמשים",
          html: `מספר שנכשלו: <strong>${result.skippedCount}</strong>`,
          confirmButtonColor: "#00B894",
        });
      } else {
        const total = result.successCount + result.skippedCount;
        Swal.fire({
          icon: "success",
          title: "המשתמשים הועלו בהצלחה",
          html: `נוספו <strong>${result.successCount}</strong> מתוך <strong>${total}</strong> משתמשים`,
          confirmButtonColor: "#00B894",
        });
      }

    } catch (err: any) {
      Swal.fire("שגיאה", err?.message || "אירעה שגיאה בהעלאת הקובץ", "error");
    }
  };


  return (
    <div className="relative">
      <label
        htmlFor="fileUpload"
        className={`bg-primary-dark text-white px-4 py-2 rounded-md font-medium cursor-pointer transition flex items-center gap-2
        ${loading ? "cursor-not-allowed opacity-60" : "hover:bg-primary-dark/90"}`}
      >
        <Upload className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        טעינה מקובץ
      </label>

      <input
        id="fileUpload"
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
        disabled={loading}
        className="hidden"
      />
    </div>
  );
};
