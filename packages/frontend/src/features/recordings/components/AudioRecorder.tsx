import * as React from 'react';
import { useState } from 'react';
import { useRecording } from '../hooks/useRecording';
import { formatTime } from '../../../shared/utils/timeUtils';
import { Button } from '../../../shared/ui/button';
import * as FiIcons from 'react-icons/fi';
import { useSelector } from 'react-redux';

import type { RecordingState } from '../types/Answer';
import RecordButton from './RecordButton';
import { RootState } from "../../../shared/store/store";
<<<<<<< HEAD
=======
import { CheckCircle2, XCircle } from 'lucide-react';
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

type AudioRecorderProps = {
  answered?: boolean;
  onFinish?: () => void;
  onSaveSuccess?: (answerId: string) => void;
<<<<<<< HEAD
=======
  setNotification?: (notification: {
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  }) => void;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  answered,
  onFinish,
  onSaveSuccess,
<<<<<<< HEAD
=======
  setNotification
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
}) => {
  const { questions, currentIndex, currentUserId } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];

  const {
    currentRecording,
    isLoading,
    startRecording,
<<<<<<< HEAD
    stopRecording,
    pauseRecording,
    resumeRecording,
    restartRecording,
    deleteRecording,
=======
    pauseRecording,
    resumeRecording,
    stopRecording,
    restartRecording,
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    saveRecording,
    audioBlobRef,
  } = useRecording() as ReturnType<typeof useRecording> & {
    currentRecording: RecordingState;
  };

  const [fileName, setFileName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [recordingPhase, setRecordingPhase] = useState<
    'idle' | 'recording' | 'paused' | 'finished'
  >('idle');

  const handleMainButtonClick = () => {
    if (recordingPhase === 'idle' || recordingPhase === 'finished') {
<<<<<<< HEAD
      startNewRecording();
    } else if (recordingPhase === 'recording') {
      handleStopRecording();
    }
  };

  const startNewRecording = async () => {
    try {
      await startRecording();
      setRecordingPhase('recording');
    } catch (error) {
      console.error('Failed to start recording:', error);
=======
      restartRecording();
      setRecordingPhase('recording');
    } else if (recordingPhase === 'recording') {
      pauseRecording();
      setRecordingPhase('paused');
    } else if (recordingPhase === 'paused') {
      resumeRecording();
      setRecordingPhase('recording');
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    setRecordingPhase('finished');
<<<<<<< HEAD
  };

  const handleDeleteRecording = () => {
    deleteRecording();
    setRecordingPhase('idle');
    setFileName('');
    setShowSaveModal(false);
=======
    onFinish?.();
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  };

  const handleSaveRecording = async () => {
    try {
<<<<<<< HEAD
      if (!fileName.trim()) {
        console.error('שם קובץ ריק');
        return;
      }

      setShowRecordingModal(false);
      setShowSaveModal(false);

      // שמור את הקוד המקורי לשימוש עתידי:
      // const answer = await saveRecording(
      //   String(currentQuestion.id),
      //   currentUserId,
      //   fileName.trim(),
      //   0
      // );
      // בדיקות בלבד: שלח תמיד userId קבוע
      const answer = await saveRecording(
        String(currentQuestion.id),
        "11111111-1111-1111-1111-111111111111",
        fileName.trim(),
        0
      );
      
      setFileName('');
      
      if (onSaveSuccess && answer?.id) {
        onSaveSuccess(answer.id);
      }
    } catch (error) {
      console.error('שגיאה בשמירה:', error);
      // הצג הודעת שגיאה למשתמש כאן
    }
=======
    setShowRecordingModal(false);
    const answer = await saveRecording(currentUserId, String(currentQuestion.id), fileName);
    setShowSaveModal(false);
    setFileName('');

    if (onSaveSuccess && answer?.id) {
      onSaveSuccess(answer.id);
    }

    setNotification?.({
      message: "ההקלטה נשמרה בהצלחה!",
      type: "success",
      icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />,
    });
    setTimeout(() => setNotification?.({ message: "", type: "success" }), 3500);

  } catch (error) {
    console.error('שגיאה בשמירה:', error);
    setNotification?.({
      message: "שגיאה בשמירת ההקלטה",
      type: "error",
      icon: <XCircle className="w-6 h-6 text-red-500" />,
    });
    setTimeout(() => setNotification?.({ message: "", type: "success" }), 3500);
  }
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  };

  const downloadRecording = () => {
    if (audioBlobRef.current) {
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
<<<<<<< HEAD
        {!showRecordingModal && (
=======
        
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
          <button
            className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-xl px-6 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              setRecordingPhase('idle');
              setShowRecordingModal(true)}
            }

            disabled={answered}
          >
            <FiIcons.FiMic size={20} />
            התחל הקלטה
          </button>
<<<<<<< HEAD
        )}
=======
        
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
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

<<<<<<< HEAD
      {/* מונה זמן - מוצג רק כשהפופאפ פתוח */}
      {showRecordingModal && (recordingPhase === 'recording' || recordingPhase === 'paused') && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-bold text-text-main">
            {formatTime(currentRecording.recordingTime)}
          </div>
        </div>
      )}

      {/* כפתורים בזמן עצירה זמנית */}
      {showRecordingModal && recordingPhase === 'paused' && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            fullWidth
            variant="outline"
            onClick={() => {
              restartRecording();
              setRecordingPhase('recording');
            }}
            icon={<FiIcons.FiRotateCcw />}
            className="gap-2"
          >
            מחדש
          </Button>
          <Button
            size="sm"
            fullWidth
            variant="primary-dark"
            onClick={handleStopRecording}
            icon={<FiIcons.FiCheck />}
            className="gap-2"
          >
            סיום
          </Button>
        </div>
      )}

=======
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
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