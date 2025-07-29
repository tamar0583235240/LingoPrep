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
import { setAI_Insight, setIsAnalyzing } from "../store/AI_InsightSlice";
import FileUpload from "../../recordings/components/FileUpload";
import { analyzeInterview } from "../services/analyze.service";
// import { AiInsightsList } from "../../recordings/components/AiInsightsList";
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
  const { AI_result, isAnalyzing } = useSelector((state: RootState) => state.AI_Insight);
  // const [AI_result, setAI_result] = useState<AI_result | string | null>(null);
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
  // הגדרת טיפוס לניתוח AI
  // interface AI_result {
  //   summary?: string;
  //   rating?: number;
  //   strengths?: string;
  //   improvements?: string;
  //   flow?: string;
  //   confidence?: string;
  //   [key: string]: any;
  // }
  useEffect(() => {
    dispatch(setAI_Insight(null));
  }, [currentIndex, dispatch]);
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
                      dispatch(setIsAnalyzing(true));
                      // dispatch(setAI_Insight(null));
                      try {
                        const result = await analyzeInterview(fileObj, answer.id.toString())
                          .then((result) => {
                            dispatch(setAI_Insight(result));
                            setIsAnalyzing(false);
                          });
                        console.log("AI Result:", result);
                        console.log("AI AI_result:", AI_result);
                        // שמירת תוצאת הניתוח בסלייס
                      } catch (err) {
                        dispatch(setAI_Insight('שגיאה בניתוח הקובץ'));
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















