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

type AudioRecorderProps = {
  answered?: boolean;
  onFinish?: () => void;
  onSaveSuccess?: (answerId: string) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  answered,
  onFinish,
  onSaveSuccess,
}) => {
  const { questions, currentIndex, currentUserId } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];

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
  const [recordingPhase, setRecordingPhase] = useState<
    'idle' | 'recording' | 'paused' | 'finished'
  >('idle');

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
      setShowRecordingModal(false);
      const answer = await saveRecording(currentUserId, String(currentQuestion.id), fileName);
      setShowSaveModal(false);
      setFileName('');
      if (onSaveSuccess && answer?.id) {
        onSaveSuccess(answer.id);
      }
    } catch (error) {
      console.error('שגיאה בשמירה:', error);
    }
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
        {!showRecordingModal && (
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
        )}
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