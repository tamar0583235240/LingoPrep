
import * as React from "react";
import * as FiIcons from "react-icons/fi";

interface RecordButtonProps {
  open: boolean;
  onClose: () => void;
  recordingPhase: "idle" | "recording" | "paused" | "finished";
  onMainButtonClick: () => void;
  onStopRecording: () => void;
  onRestartRecording: () => void;
  recordingTime: number;
  audioBlob: Blob | null;
  onSave: () => void;
  onDownload: () => void;
  formatTime: (seconds: number) => string;
  className?: string;
  disabled?: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  open,
  onClose,
  recordingPhase,
  onMainButtonClick,
  onStopRecording,
  onRestartRecording,
  recordingTime,
  audioBlob,
  onSave,
  onDownload,
  formatTime,
  className = '',
  disabled = false,
}) => {
  const [showFinalActions, setShowFinalActions] = React.useState(false);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className={`bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md text-center relative animate-fadeInUp border border-[var(--color-border)] ${className}`}>
        {/* סגירה */}
        <button className="absolute left-6 top-6 text-[var(--color-secondary-text)] hover:text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-muted)] rounded-full p-2" onClick={onClose}>
          <FiIcons.FiX size={20} />
        </button>

        {/* כותרת */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">הקלטת קול</h2>
          <p className="text-[var(--color-secondary-text)] text-sm">הקלט את התשובה שלך</p>
        </div>

        {recordingPhase === "idle" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center cursor-pointer group" onClick={onMainButtonClick}>
                <span className="absolute inset-0 rounded-full bg-red-500/80 group-hover:scale-110 transition-transform animate-pulse" />
                <FiIcons.FiMic size={40} className="text-white relative z-10" />
              </div>
              <span className="mt-2 text-base text-[var(--color-primary-dark)] font-semibold">התחל הקלטה</span>
            </div>
          </div>
        )}

        {/* Recording */}
        {recordingPhase === "recording" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center cursor-pointer group" onClick={onMainButtonClick}>
                <span className="absolute inset-0 rounded-full bg-red-500/80 group-hover:scale-110 transition-transform animate-pulse" />
                <FiIcons.FiMic size={40} className="text-white relative z-10" />
              </div>
              <span className="mt-2 text-base text-[var(--color-primary-dark)] font-semibold">הקלטה פעילה</span>
              <div className="px-6 py-3">
                <div className="font-mono text-2xl font-bold tracking-wider" style={{ color: "var(--color-primary-dark)" }}>
                  {formatTime(recordingTime)}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--color-secondary-text)" }}>זמן הקלטה</div>
              </div>
            </div>
          </div>
        )}

        {/* Paused */}
        {recordingPhase === "paused" && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center cursor-pointer group" onClick={onMainButtonClick}>
                <span className="absolute inset-0 rounded-full bg-green-500/80 group-hover:scale-110 transition-transform animate-pulse" />
                <FiIcons.FiPlay size={40} className="text-white relative z-10" />
              </div>
              <span className="mt-2 text-base text-[var(--color-primary-dark)] font-semibold">בהשהיה</span>
              <div className="px-6 py-3">
                <div className="font-mono text-2xl font-bold tracking-wider" style={{ color: "var(--color-primary-dark)" }}>
                  {formatTime(recordingTime)}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--color-secondary-text)" }}>משך ההקלטה</div>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <button onClick={() => { onRestartRecording(); onClose(); }} className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-lg text-white" style={{ backgroundColor: "#E53E3E" }}>
                <FiIcons.FiTrash2 size={22} />
                מחק
              </button>
              <button
                onClick={() => { onRestartRecording(); setShowFinalActions(false); }}
                title="הקלט מחדש"
                className="flex items-center justify-center gap-2 rounded-full shadow-lg transition-all duration-200 font-semibold text-base px-5 py-3"
                style={{ backgroundColor: "var(--color-muted, #E5E7EB)", color: "var(--color-text)" }}>
                <FiIcons.FiRefreshCw size={22} />
                מחדש
              </button>
              <button onClick={onStopRecording} className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-lg text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                <FiIcons.FiCheckCircle size={22} />
                סיום
              </button>

            </div>
          </div>
        )}

        {/* Finished */}
        {recordingPhase === "finished" && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FiIcons.FiCheckCircle size={24} style={{ color: "var(--color-primary)" }} />
              <span className="font-bold text-lg" style={{ color: "var(--color-primary-dark)" }}>הקלטה הושלמה!</span>
            </div>
            <div className="rounded-2xl px-6 py-3 border shadow-inner" style={{ backgroundImage: "linear-gradient(to right, #D1FAE5, #99F6E4)", borderColor: "#A7F3D0" }}>
              <div className="font-mono text-xl font-bold tracking-wider" style={{ color: "#065F46" }}>
                {formatTime(recordingTime)}
              </div>
              <div className="text-xs mt-1" style={{ color: "#047857" }}>משך ההקלטה</div>
            </div>
            {audioBlob && (
              <div className="rounded-xl p-4 border" style={{ backgroundColor: "var(--color-muted, #F3F4F6)", borderColor: "var(--color-border)" }}>
                <audio controls className="w-full h-10 rounded-lg" style={{ backgroundColor: "white", border: "1px solid var(--color-border)" }}>
                  <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                  הדפדפן שלך לא תומך בניגון אודיו.
                </audio>
              </div>
            )}
            <div className="flex justify-center gap-6 mt-6">
              <button onClick={onSave} className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-lg text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                <FiIcons.FiSave size={22} />
                שמור
              </button>
              <button onClick={onDownload} className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-lg text-white" style={{ backgroundColor: "var(--color-primary-dark)" }}>
                <FiIcons.FiDownload size={22} />
                הורד
              </button>
              <button onClick={() => { onRestartRecording(); onClose(); }} className="flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-lg text-white" style={{ backgroundColor: "#E53E3E" }}>
                <FiIcons.FiTrash2 size={22} />
                מחק
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordButton;