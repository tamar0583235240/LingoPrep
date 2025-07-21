// InterviewPage.tsx

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useGetQuestionsByCategoryQuery } from "../features/interview/services/questionsApi";
import {
  setQuestions,
  goToQuestion,
  setCurrentAnswerId,
  setCurrentUserId,
} from "../features/interview/store/simulationSlice";
import { addAnsweredAnswer } from "../features/interview/store/answeredSlice";
import { RootState } from "../shared/store/store";

import Sidebar from "../features/interview/components/sidebar";
import Question from "../features/interview/components/question";
import AnswerAI from "../features/interview/components/AnswerAI";
import TipsComponent from "../features/interview/components/tipsComponent";
import MagicLoader from "../features/interview/components/MagicLoader";
import EndSurvey from "../features/interview/components/endSurvey";
import CategoryDropdown from "../features/interview/components/showCategories";
import { skipToken } from "@reduxjs/toolkit/query";
import { CheckCircle2 } from "lucide-react";

const InterviewPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);


  const dispatch = useDispatch();
  const { currentCategoryId, currentIndex, currentAnswerId } = useSelector(
    (state: RootState) => state.simulation
  );

  const { data: questions = [], isLoading, isError } =
    useGetQuestionsByCategoryQuery(currentCategoryId || skipToken, {
      refetchOnMountOrArgChange: true,
    });

  const answeredAnswers = useSelector(
    (state: RootState) => state.answered.answeredAnswers
  );

  const [showTips, setShowTips] = useState(false);
  const [showAnswerAI, setShowAnswerAI] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const [notification, setNotification] = useState<{
  message: string;
  type: "success" | "error";
  icon?: React.ReactNode;
} | null>(null);

const [notificationOpen, setNotificationOpen] = useState(false);

  const answeredQuestionIds = useMemo(() => {
    return answeredAnswers.map((a: { question: { id: any; }; }) => a.question.id);
  }, [answeredAnswers]);

  const questionsWithStatus = useMemo(() => {
    return questions.map((q: any) => ({
      ...q,
      answered: answeredQuestionIds.includes(q.id),
    }));
  }, [questions, answeredQuestionIds]);

  const isCurrentQuestionAnswered = questionsWithStatus[currentIndex]?.answered;

  const totalQuestions = questions.length;
  const answeredCount = questionsWithStatus.filter(q => q.answered).length;
  const allAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  useEffect(() => {
    if (user?.id) {
      console.log(user.id);
      
      dispatch(setCurrentUserId(user.id));
    }
  }, [user, dispatch]);
  // Reset answerIdForAI & isLoadingAI when moving to another question
  useEffect(() => {
    dispatch(setCurrentAnswerId(null));
    setIsLoadingAI(false);
    setShowTips(true);
  }, [currentIndex]);

  useEffect(() => {
    if (questions.length > 0) {
      dispatch(setQuestions(questions));
      dispatch(goToQuestion(0));
    }
  }, [questions, dispatch]);

  useEffect(() => {
  if (currentAnswerId) {
    setIsLoadingAI(true); // בזמן התחלת פתיחה
  }
}, [currentAnswerId]);

  if (isLoading) return <p className="p-8 text-center">טוען שאלות...</p>;

  const handleAnswerSaved = (answerId: string) => {
     const q = questions[currentIndex];
  dispatch(
    addAnsweredAnswer({
      id: answerId,
      question: { id: String(q.id), text: q.title || q.text },
    })
  );

  // הצגת ההודעה
  setNotification({
    message: "התשובה נשמרה בהצלחה!",
    type: "success",
    icon: <CheckCircle2 className="w-6 h-6 text-[--color-primary-dark]" />,
  });
  setNotificationOpen(true); // נפתח פופאפ

  // נעלים אחרי 3.5 שניות ואז נתחיל AI
  setTimeout(() => {
    setNotification(null);
    setNotificationOpen(false);
    dispatch(setCurrentAnswerId(answerId));
  }, 3500);
  };

return (
  <div className="min-h-screen bg-[#f7faff] flex flex-col relative">
    {/* Dropdown בחלק העליון */}
    <div className="w-full flex justify-center py-6">
      <div className="w-full max-w-sm px-6">
        <CategoryDropdown />
      </div>
    </div>

    {/* תוכן עיקרי: Sidebar ושאלה */}
    <div className="flex  flex-row items-stretch px-2 gap-2">
      {/* Sidebar */}
      <div className="flex-1 flex justify-center items-start">
        <Sidebar
          questions={questionsWithStatus}
          currentIndex={currentIndex}
          onNavigate={(index) => dispatch(goToQuestion(index))}
        />
      </div>

      {/* שאלה */}
      <div className="flex-1 flex justify-center items-start">
        {isLoading ? (
          <p className="p-8 text-center">טוען שאלות...</p>
        ) : questionsWithStatus[currentIndex] ? (
          <div className="p-10 max-w-4xl w-full">
            <Question
              question={questionsWithStatus[currentIndex]}
              onFinishRecording={() => setShowTips(true)}
              onAnswerSaved={handleAnswerSaved}
            />
          </div>
        ) : (
          <p className="text-red-500 text-center mt-10">אין שאלות להצגה</p>
        )}
 
    </div>
          </div>
            <div className="mt-8 w-full flex justify-center">
  <div className="w-full max-w-2xl">
    <EndSurvey
      showEndButton={allAnswered}
      answeredCount={answeredCount}
      totalQuestions={totalQuestions}
    />
  </div>
</div>

{isCurrentQuestionAnswered && !currentAnswerId && !notificationOpen && (
  <div className="flex justify-center mt-4">
    <button
      onClick={() => {
        const answered = answeredAnswers.find(
          (a) => a.question.id === questionsWithStatus[currentIndex].id
        );
        if (answered) {
          dispatch(setCurrentAnswerId(answered.id));
        }
      }}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      הצג ניתוח AI
    </button>
  </div>
)}

    {/* אזור טיפים קבוע בתחתית שמאל */}
    <div className="fixed bottom-4 left-4 w-[350px] z-30">
      {showTips ? (
        <div className="bg-white border border-indigo-100 rounded-xl shadow-lg p-4">
          <div className="text-right mb-2">
            <button
              onClick={() => setShowTips(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <TipsComponent />
        </div>
      ) : (
        <button
          onClick={() => setShowTips(true)}
          className="fixed bottom-4 left-4 z-50 text-3xl text-indigo-600 hover:text-indigo-800 transition-transform duration-200 hover:scale-125"
          title="הצג טיפים"
        >
          💡
        </button>
      )}
    </div>

    

    {/* פופאפ ל-AI */}
    {currentAnswerId && !notificationOpen && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 p-6 relative min-h-[200px] flex items-center justify-center">
    {isLoadingAI ? (
      <div className="text-center">
        <h3 className="text-lg font-bold text-purple-800 mb-3">מנתח תשובה...</h3>
        <MagicLoader />
      </div>
    ) : (
      <>
        <button
          onClick={() => dispatch(setCurrentAnswerId(null))}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>
        <AnswerAI
          answerId={currentAnswerId}
          onClose={() => dispatch(setCurrentAnswerId(null))}
          onLoaded={() => setIsLoadingAI(false)}
        />
      </>
    )}
  </div>
</div>
    )}
  </div>
);

};

export default InterviewPage;