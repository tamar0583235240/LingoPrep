import React, { useRef, useState, useEffect } from "react";
import * as FiIcons from "react-icons/fi";
import { CheckCircle2, XCircle } from "lucide-react";
import { useUploadRecordingMutation } from "../services/resourceApi";
import { Spinner } from "../../../shared/ui/Spinner";
import Notification from "./../../interview/components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAnswerId, } from "../../interview/store/simulationSlice";
import { RootState } from "../../../shared/store/store";

interface FileUploadProps {
  answered?: boolean;
  userId: string;
  onUploaded: (fileUrl: string, fileName: string, fileObj: File) => void;
  onError?: (error: any) => void;
}
const FileUpload: React.FC<FileUploadProps> = ({
  answered,
  userId,
  onUploaded,
  onError
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { currentAnswerId } = useSelector(
    (state: RootState) => state.simulation
  );
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploadRecording] = useUploadRecordingMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      // יצירת URL זמני לקובץ
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
      setShowModal(true);
    }
  };
  const handleRemove = () => {
    // ניקוי URL זמני
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl(null);
    }
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowModal(false);
  };
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", file.name);
    formData.append("description", "");
    formData.append("file", file);
    try {
      const res = await uploadRecording(formData).unwrap();
      console.log("uploadRecording response:", res);

      setNotification({
        message: "הקובץ נשמר בהצלחה!",
        type: "success",
        icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />,
      });

      onUploaded(res.url, file.name, file); // העברת הקובץ עצמו
      handleRemove();
      setTimeout(() => {
        setNotification(null);
      }, 3500);
    } catch (e) {
      setNotification({
        message: "שגיאה בשמירת התשובה",
        type: "error",
        icon: <XCircle className="w-6 h-6 text-red-500" />,
      });
      setTimeout(() => setNotification(null), 3500);
      onError?.(e);
    } finally {
      setIsUploading(false);
    }
  };
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const isVideoFile = (file: File): boolean => {
    return file.type.startsWith('video/');
  };
  const isAudioFile = (file: File): boolean => {
    return file.type.startsWith('audio/');
  };
  return (
    <>
      {/* הצגת notification פנימי */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          icon={notification.icon}
          onClose={() => setNotification(null)}
        />
      )}
      {/* כפתור העלאת קובץ הרגיל */}
      <div className="flex flex-col items-center gap-2 w-full">
        <input
          type="file"
          accept="audio/*,video/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={isUploading}
        />
        <button
          type="button"
          className="w-full bg-white text-[var(--color-primary)] border border-[var(--color-primary)] rounded-xl px-6 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => fileInputRef.current?.click()}
          disabled={answered}
        >
          העלה קובץ
          <FiIcons.FiUpload className="w-5 h-5" />
        </button>
      </div>
      {/* פופאפ מודל */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md text-center relative animate-fadeInUp border border-[var(--color-border)]">
            {/* סגירה */}
            <button
              className="absolute left-6 top-6 text-[var(--color-secondary-text)] hover:text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-muted)] rounded-full p-2"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <FiIcons.FiX size={20} />
            </button>
            {/* כותרת */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">העלאת קובץ</h2>
            </div>
            {/* File selected - not uploading */}
            {file && !isUploading && (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <FiIcons.FiFile size={24} style={{ color: "var(--color-primary)" }} />
                  <span className="font-bold text-lg" style={{ color: "var(--color-primary-dark)" }}>קובץ נבחר!</span>
                </div>
                <div className="rounded-2xl px-6 py-4 border shadow-inner" style={{ backgroundImage: "linear-gradient(to right, #DBEAFE, #BFDBFE)", borderColor: "#93C5FD" }}>
                  <div className="font-semibold text-base truncate" style={{ color: "#1E40AF" }}>
                    {file.name}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#1D4ED8" }}>
                    {formatFileSize(file.size)}
                  </div>
                </div>
                {/* נגן אודיו/וידאו */}
                {fileUrl && (
                  <div className="rounded-xl p-4 border" style={{ backgroundColor: "var(--color-muted, #F3F4F6)", borderColor: "var(--color-border)" }}>
                    {isVideoFile(file) ? (
                      <video
                        controls
                        className="w-full max-h-48 rounded-lg"
                        style={{ backgroundColor: "white", border: "1px solid var(--color-border)" }}
                      >
                        <source src={fileUrl} type={file.type} />
                        הדפדפן שלך לא תומך בניגון וידאו.
                      </video>
                    ) : isAudioFile(file) ? (
                      <audio
                        controls
                        className="w-full h-10 rounded-lg"
                        style={{ backgroundColor: "white", border: "1px solid var(--color-border)" }}
                      >
                        <source src={fileUrl} type={file.type} />
                        הדפדפן שלך לא תומך בניגון אודיו.
                      </audio>
                    ) : (
                      <div className="text-center py-4 text-[var(--color-secondary-text)]">
                        <FiIcons.FiFile size={32} className="mx-auto mb-2" />
                        <p>תצוגה מקדימה לא זמינה לסוג קובץ זה</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex justify-center gap-6 mt-6">
                  <button
                    onClick={handleUpload}
                    className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-lg text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <FiIcons.FiUpload size={22} />
                    העלה
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-lg text-white"
                    style={{ backgroundColor: "var(--color-primary-dark)" }}
                  >
                    <FiIcons.FiRefreshCw size={22} />
                    החלף
                  </button>
                  <button
                    onClick={handleRemove}
                    className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-lg text-white"
                    style={{ backgroundColor: "#E53E3E" }}
                  >
                    <FiIcons.FiTrash2 size={22} />
                    מחק
                  </button>
                </div>
              </div>
            )}
            {/* Uploading */}
            {isUploading && (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-green-500/80 animate-pulse" />
                    <div className="relative z-10">
                      <Spinner />
                    </div>
                  </div>
                  <span className="mt-2 text-base text-[var(--color-primary-dark)] font-semibold">מעלה קובץ...</span>
                </div>
                {file && (
                  <div className="rounded-2xl px-6 py-4 border shadow-inner" style={{ backgroundImage: "linear-gradient(to right, #D1FAE5, #99F6E4)", borderColor: "#A7F3D0" }}>
                    <div className="font-semibold text-base truncate" style={{ color: "#065F46" }}>
                      {file.name}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#047857" }}>
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default FileUpload;
