import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRecording } from '../hooks/useRecording';
import { formatTime } from '../../../shared/utils/timeUtils';
import { Button } from '../../../shared/ui/button';
import * as FiIcons from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeInterview } from '../../interview/services/analyze.service';
import type { RecordingState } from '../types/Answer';
import RecordButton from './RecordButton';
import { RootState } from "../../../shared/store/store";
import { CheckCircle2, XCircle } from 'lucide-react';
import { setAI_Insight, setIsAnalyzing } from '../../interview/store/AI_InsightSlice';

type AudioRecorderProps = {
  answered?: boolean;
  onFinish?: () => void;
  onSaveSuccess?: (answerId: string) => void;
  setNotification?: (notification: {
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  answered,
  onFinish,
  onSaveSuccess,
  setNotification
}) => {
  const { questions, currentIndex, currentUserId } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];
  const { AI_result, isAnalyzing } = useSelector((state: RootState) => state.AI_Insight);
  const dispatch = useDispatch();


  const {
    currentRecording,
    isLoading,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    restartRecording,
    saveRecording,
    audioBlobRef,
  } = useRecording() as ReturnType<typeof useRecording> & {
    currentRecording: RecordingState;
  };

  const [fileName, setFileName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  // const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingPhase, setRecordingPhase] = useState<
    'idle' | 'recording' | 'paused' | 'finished'
  >('idle');

  useEffect(() => {


  }, [isAnalyzing]);

  const handleMainButtonClick = () => {
    if (recordingPhase === 'idle' || recordingPhase === 'finished') {
      restartRecording();
      setRecordingPhase('recording');
    } else if (recordingPhase === 'recording') {
      pauseRecording();
      setRecordingPhase('paused');
    } else if (recordingPhase === 'paused') {
      resumeRecording();
      setRecordingPhase('recording');
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    setRecordingPhase('finished');
    onFinish?.();
  };

  const handleSaveRecording = async () => {
    try {
      console.log(audioBlobRef.current, "saveRecording");

      setShowRecordingModal(false);
      console.log(audioBlobRef.current, "setShowRecordingModal");

      const answer = await saveRecording(currentUserId, String(currentQuestion.id), fileName.trim());
      console.log("After saveRecording, answer:", answer);
      setShowSaveModal(false);


      if (onSaveSuccess && answer?.id) {
        console.log("onSaveSuccess and answer.id exist", { onSaveSuccessExists: !!onSaveSuccess, answerId: answer?.id });
        if (audioBlobRef.current) {
          console.log("audioBlobRef.current exists", audioBlobRef.current);
          console.log("Blob type:", audioBlobRef.current.type);
          console.log("Blob size:", audioBlobRef.current.size);
          console.log("File name:", fileName || "recording.wav");
          if (audioBlobRef.current.type === "audio/webm" || audioBlobRef.current.type === "video/webm") {
            console.warn("הקלטה היא בפורמט webm, לא wav אמיתי. יש להמיר בשרת!");
          }
          let safeFileName = fileName.trim() || "recording.webm";
          if (!safeFileName.endsWith('.webm')) {
            safeFileName += '.webm';
          }
          const file = new File([audioBlobRef.current], safeFileName, { type: "audio/webm" });
          onSaveSuccess(answer.id);
          setFileName('');
          setNotification?.({
            message: "ההקלטה נשמרה בהצלחה!",
            type: "success",
            icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />,
          });
          setTimeout(() => setNotification?.(null), 3500);

          // רק אחרי שהמשתמש רואה שההקלטה נשמרה, תפעילי את הניתוח:
          if (audioBlobRef.current) {
            const file = new File([audioBlobRef.current], safeFileName, { type: "audio/webm" });
            try {
              const result = await analyzeInterview(file, answer.id.toString());
              dispatch(setAI_Insight(result));
            } catch (err) {
              dispatch(setAI_Insight('שגיאה בניתוח הקובץ'));
            }
          }
        } else {
          console.log("audioBlobRef.current is missing");
        }
      } else {
        console.log("onSaveSuccess or answer.id missing", { onSaveSuccessExists: !!onSaveSuccess, answerId: answer?.id });
      }

    } catch (error) {
      console.error('שגיאה בשמירה:', error);
      setNotification?.({
        message: "שגיאה בשמירת ההקלטה",
        type: "error",
        icon: <XCircle className="w-6 h-6 text-red-500" />,
      });
      setTimeout(() => setNotification?.(null), 3500);
    }
  };

  const downloadRecording = () => {
    if (audioBlobRef.current) {
      console.log(audioBlobRef.current);

      const url = URL.createObjectURL(audioBlobRef.current);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'recording.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  return (
    <div className="space-y-4 w-full">
      {/* כפתור ראשי תמיד מוצג */}
      <>
        <button
          className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-xl px-6 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            setRecordingPhase('idle');
            setShowRecordingModal(true)
          }
          }
          disabled={answered}
        >
          <FiIcons.FiMic size={20} />
          התחל הקלטה
        </button>
        <RecordButton
          open={showRecordingModal}
          onClose={() => setShowRecordingModal(false)}
          recordingPhase={recordingPhase}
          onMainButtonClick={handleMainButtonClick}
          onStopRecording={handleStopRecording}
          onRestartRecording={() => {
            restartRecording();
            setRecordingPhase('recording');
          }}
          recordingTime={currentRecording.recordingTime}
          audioBlob={audioBlobRef.current}
          onSave={() => setShowSaveModal(true)}
          onDownload={downloadRecording}
          formatTime={formatTime}
        />
      </>

      {/* מודאל להזנת שם קובץ */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs flex flex-col items-center animate-fadeInUp border border-[var(--color-border)]">
            <h3 className="text-xl font-bold mb-4 text-[var(--color-text)]">שם הקובץ</h3>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 mb-4 text-center text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="הכנס שם לקובץ..."
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              autoFocus
              maxLength={40}
            />
            <div className="flex gap-3 w-full">
              <Button
                fullWidth
                variant="primary-dark"
                disabled={!fileName.trim() || isLoading}
                onClick={handleSaveRecording}
                className="font-semibold"
              >
                שמור
              </Button>
              <Button
                fullWidth
                variant="outline"
                onClick={() => setShowSaveModal(false)}
                className="font-semibold"
              >
                ביטול
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
