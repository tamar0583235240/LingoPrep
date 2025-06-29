// חבילות חיצוניות
import React, { useState } from 'react';
// ייבוא פנימי
import { useRecording } from '../hooks/useRecording';
import { formatTime } from '../../../shared/utils/timeUtils';
// סטייל
import './AudioRecorder.css';

// טיפוס עזר (אם לא קיים, יש להוסיף בקובץ טיפוסים)
interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
}

interface AudioRecorderProps {
  userId?: string;
  questionId?: string;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  userId = '00000000-0000-0000-0000-000000000000', 
  questionId = '00000000-0000-0000-0000-000000000010' // מזהה שאלה אמיתי
}) => {
  const {
    currentRecording,
    showRecordingModal,
    isLoading,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording,
    restartRecording,
    saveRecording,
    audioBlobRef,
  } = useRecording() as ReturnType<typeof useRecording> & {
    currentRecording: RecordingState;
  };

  const [fileName, setFileName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  // שמירת הקלטה
  const handleSaveRecording = async () => {
    try {
      await saveRecording(userId, questionId, fileName);
      setShowSaveModal(false);
      setFileName('');
    } catch (error) {
      console.error('Failed to save recording:', error);
    }
  };

  // הורדת הקלטה
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
    <div className="audio-recorder">
      <div className="recorder-container">
        <h3 className="recorder-title">מערכת הקלטת תשובות</h3>
        {/* כפתורים ראשיים */}
        <div className="main-buttons">
          <button
            onClick={startRecording}
            disabled={currentRecording.isRecording}
            className="btn btn-record"
          >
            <span className="btn-icon">🎤</span>
            <span>התחל הקלטה</span>
          </button>
          <button
            disabled={true}
            className="btn btn-upload btn-disabled"
          >
            <span className="btn-icon">📁</span>
            <span>העלאת קובץ</span>
            <div className="coming-soon">בקרוב</div>
          </button>
          <button
            onClick={() => setShowSaveModal(true)}
            disabled={!audioBlobRef.current}
            className="btn btn-save"
          >
            <span className="btn-icon">💾</span>
            <span>שמור הקלטה</span>
          </button>
        </div>
        {/* נגן אם יש הקלטה */}
        {audioBlobRef.current && (
          <div className="audio-preview">
            <h4>תצוגה מקדימה:</h4>
            <audio controls className="audio-player">
              <source src={URL.createObjectURL(audioBlobRef.current)} type="audio/wav" />
            </audio>
            <button onClick={downloadRecording} className="btn btn-download">
              <span className="btn-icon">⬇️</span>
              הורד קובץ
            </button>
          </div>
        )}
      </div>

      {/* פופ-אפ הקלטה */}
      {showRecordingModal && (
        <div className="modal-overlay">
          <div className="recording-modal">
            <div className="recording-header">
              <div className="timer">
                {formatTime(currentRecording.recordingTime)}
              </div>
            </div>
            <div className="recording-content">
              <div className="microphone-container">
                <div className={`microphone-icon ${currentRecording.isRecording && !currentRecording.isPaused ? 'active' : ''}`}>
                  {currentRecording.isRecording && !currentRecording.isPaused && (
                    <>
                      <div className="pulse-ring ring-1"></div>
                      <div className="pulse-ring ring-2"></div>
                      <div className="pulse-ring ring-3"></div>
                    </>
                  )}
                  <span className="mic-emoji">🎤</span>
                </div>
              </div>
              <h4 className="recording-status">
                {currentRecording.isRecording && !currentRecording.isPaused
                  ? 'מקליט...'
                  : currentRecording.isPaused
                  ? 'הקלטה מושהית'
                  : 'הקלטה הושלמה'}
              </h4>
              <div className="recording-controls">
                {/* כפתור עצירה בזמן הקלטה */}
                {currentRecording.isRecording && (
                  <button onClick={pauseRecording} className="btn btn-pause">
                    ⏸️ עצור הקלטה
                  </button>
                )}
                {/* כפתורים אחרי עצירה */}
                {currentRecording.isPaused && (
                  <>
                    {audioBlobRef.current && (
                      <div className="audio-preview-modal">
                        <audio controls className="audio-player-modal">
                          <source src={URL.createObjectURL(audioBlobRef.current)} type="audio/wav" />
                        </audio>
                      </div>
                    )}
                    <div className="control-buttons">
                      <button onClick={resumeRecording} className="btn btn-resume">
                        ▶️ המשך
                      </button>
                      <button onClick={restartRecording} className="btn btn-restart">
                        🔄 מחדש
                      </button>
                      <button onClick={deleteRecording} className="btn btn-delete">
                        🗑️ מחק
                      </button>
                      <button onClick={stopRecording} className="btn btn-finish">
                        ✅ סיום
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* פופ-אפ שמירה */}
      {showSaveModal && (
        <div className="modal-overlay">
          <div className="save-modal">
            <h4>שמירת הקלטה</h4>
            <div className="save-form">
              <label>שם הקובץ:</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="הזן שם לקובץ..."
                className="file-name-input"
              />
              <div className="save-buttons">
                <button
                  onClick={handleSaveRecording}
                  disabled={isLoading || !fileName.trim()}
                  className="btn btn-confirm"
                >
                  {isLoading ? 'שומר...' : '💾 שמור'}
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="btn btn-cancel"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;