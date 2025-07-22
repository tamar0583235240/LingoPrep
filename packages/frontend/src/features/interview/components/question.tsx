import React, { useState } from "react";
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { interviewType } from "../types/questionType";
import Notification from "./Notification";
import FileUpload from "../../recordings/components/FileUpload";
import AudioRecorder from "../../recordings/components/AudioRecorder";
import { useUploadAnswerMutation } from "../../recordings/services/recordingApi";
import type { NotificationType } from "../types/notificationType";

interface QuestionProps {
  question: interviewType & { answered?: boolean };
  onFinishRecording: () => void;
  onAnswerSaved: (answerId: string) => void;
  onNavigate: (index: number) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onFinishRecording,
  onAnswerSaved,
  onNavigate,
}) => {
  const dispatch = useDispatch();
  const { questions, currentIndex, currentUserId } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];
  const [uploadAnswer] = useUploadAnswerMutation();
  const [notification, setNotification] = useState<NotificationType>(null);

  if (!questions.length || currentIndex >= questions.length) return <div>אין שאלות להצגה</div>;

  return (
    <div className="bg-transparent">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          icon={notification.icon}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="text-primary hover:bg-primary/10 border border-transparent hover:border-primary rounded-md px-2 py-1 transition"
          aria-label="שאלה קודמת"
          disabled={currentIndex === 0}
        >
          <ChevronRight size={40} />
        </button>

        <div className="bg-white rounded-2xl shadow-md border border-[--color-border] p-4 max-w-xl w-full text-right">
          <div className="flex justify-between items-center mb-2">
            <span className="bg-[--color-background] text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
              שאלה {currentIndex + 1}
            </span>
          </div>

          <div className="text-2xl md:text-3xl font-bold text-text-main mb-6 leading-snug">
            {currentQuestion.title}
          </div>

          <div className="text-xl mb-6 leading-snug">
            {currentQuestion.content}
          </div>

          <div className="flex gap-4 w-full">
            <div className="w-1/2">
              <FileUpload
                answered={question.answered}
                userId={currentUserId}
                onUploaded={async (fileUrl, fileName) => {
                  try {
                    const answer = await uploadAnswer({
                      userId: currentUserId,
                      questionId: String(currentQuestion.id),
                      fileUrl,
                      amountFeedbacks: 0,
                      answerFileName: fileName,
                    }).unwrap();

                    setNotification({
                      message: "הקובץ נשמר בהצלחה!",
                      type: "success",
                      icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />,
                    });

                    setTimeout(() => {
                      setNotification(null);
                      if (answer?.id) onAnswerSaved(answer.id);
                    }, 3500);
                  } catch (e) {
                    setNotification({
                      message: "שגיאה בשמירת התשובה",
                      type: "error",
                      icon: <XCircle className="w-6 h-6 text-red-500" />,
                    });
                    setTimeout(() => setNotification(null), 3500);
                  }
                }}
                onError={() => {
                  setNotification({
                    message: "שגיאה בהעלאת קובץ",
                    type: "error",
                    icon: <XCircle className="w-6 h-6 text-red-500" />,
                  });
                  setTimeout(() => setNotification(null), 3500);
                }}
              />
            </div>

            <div className="w-1/2">
              <AudioRecorder
                answered={question.answered}
                onFinish={onFinishRecording}
                onSaveSuccess={onAnswerSaved}
                // setNotification={setNotification}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="text-primary hover:bg-primary/10 border border-transparent hover:border-primary rounded-md px-3 py-1 transition mt-2"
          aria-label="שאלה הבאה"
          disabled={currentIndex === questions.length - 1}
        >
          <ChevronLeft size={40} />
        </button>
      </div>
    </div>
  );
};

export default Question;
