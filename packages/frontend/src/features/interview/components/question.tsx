import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, XCircle, Trash2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { interviewType } from "../types/questionType";
import AudioRecorder from "../../recordings/components/AudioRecorder";
import Notification from "./Notification";
// import { answeredQuestions } from "../store/simulationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import MagicLoader from "./MagicLoader";
import { useUploadAnswerMutation } from "../../recordings/services/recordingApi";
import { setCurrentAnswerId } from "../../interview/store/simulationSlice";

import FileUpload from "../../recordings/components/FileUpload";
import { analyzeInterview } from "../services/analyze.service";
import { AiInsightsList } from "../../recordings/components/AiInsightsList";
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
  const { currentAnswerId } = useSelector(
    (state: RootState) => state.simulation
  );

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // הגדרת טיפוס לניתוח AI
  interface AnalysisResult {
    summary?: string;
    rating?: number;
    strengths?: string;
    improvements?: string;
    flow?: string;
    confidence?: string;
    [key: string]: any;
  }
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | string | null>(null);
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
        {/* כפתור קודם בצד ימין */}
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="text-primary hover:bg-primary/10 border border-transparent hover:border-primary rounded-md px-2 py-1 transition"
          aria-label="שאלה קודמת"
          disabled={currentIndex === 0}
        >
          <ChevronRight size={40} />
        </button>
        {/* תוכן השאלה במרכז */}
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
            {/* העלאת קובץ */}
            <div className="w-1/2">
              <FileUpload
                answered={question.answered}
                userId={currentUserId}
                onUploaded={async (fileUrl, fileName, fileObj) => {
                  try {
                    const answer = await uploadAnswer({
                      userId: currentUserId,
                      questionId: String(currentQuestion.id),
                      fileUrl,
                      amountFeedbacks: 0,
                      answerFileName: fileName,
                    }).unwrap();
                    if (answer?.id && fileObj) {
                      onAnswerSaved(answer.id);
                      dispatch(setCurrentAnswerId(answer.id.toString()));
                      setIsAnalyzing(true);
                      setAnalysisResult(null);
                      try {
                        const result = await analyzeInterview(fileObj, answer.id.toString());
                        setAnalysisResult(result);
                      } catch (err) {
                        setAnalysisResult('שגיאה בניתוח הקובץ');
                      } finally {
                        setIsAnalyzing(false);
                      }
                    }
                  } catch (e) {
                    console.error('שגיאה בשמירת התשובה:', e);
                  }
                }}
                onError={(error) => {
                  console.error('שגיאה בהעלאת קובץ:', error);
                }}
              />
            </div>
            {/* הקלטה */}
            <div className="w-1/2">
              <AudioRecorder
                answered={question.answered}
                onFinish={onFinishRecording}
                onSaveSuccess={onAnswerSaved}
                setNotification={setNotification}
              />
            </div>
          </div>
          {/* הצגת תוצאת ניתוח AI */}
          {isAnalyzing && (
            <div className="flex justify-center items-center mt-4">
              <MagicLoader />
              <span className="ml-2">מנתח תשובה...</span>
            </div>
          )}
          {analysisResult && !isAnalyzing && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
              <div className="font-bold mb-2">תוצאת ניתוח AI:</div>
              <div>
                {typeof analysisResult === 'string' ? (
                  analysisResult
                ) : (
                  <div>
                    {'summary' in analysisResult && <div><b>סיכום:</b> {analysisResult.summary}</div>}
                    {'rating' in analysisResult && <div><b>דירוג:</b> {analysisResult.rating}</div>}
                    {'strengths' in analysisResult && <div><b>חוזקות:</b> {analysisResult.strengths}</div>}
                    {'improvements' in analysisResult && <div><b>הצעות לשיפור:</b> {analysisResult.improvements}</div>}
                    {'flow' in analysisResult && <div><b>שטף:</b> {analysisResult.flow}</div>}
                    {'confidence' in analysisResult && <div><b>ביטחון:</b> {analysisResult.confidence}</div>}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* הצגת AiInsightsList רק אחרי סיום הניתוח */}
          {currentAnswerId && (
            <AiInsightsList answerId={currentAnswerId} isAnalyzing={isAnalyzing} />
          )}
        </div>
        {/* </div> */}
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