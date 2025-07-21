<<<<<<< HEAD
// InterviewPage.tsx
=======
// InterviewPage.tsx - גרסה משופרת
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useGetQuestionsByCategoryQuery } from "../features/interview/services/questionsApi";
import {
  setQuestions,
  goToQuestion,
  setCurrentAnswerId,
<<<<<<< HEAD
=======
  setCurrentUserId,
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
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
<<<<<<< HEAD

const InterviewPage = () => {
=======
import { CheckCircle2, Lightbulb, X } from "lucide-react";
import { Button } from "../shared/ui/button";

const InterviewPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
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
<<<<<<< HEAD
  const [isLoadingAI, setIsLoadingAI] = useState(false);

=======
  const [showAnswerAI, setShowAnswerAI] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null>(null);

  const [notificationOpen, setNotificationOpen] = useState(false);

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
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

<<<<<<< HEAD
  // Reset answerIdForAI & isLoadingAI when moving to another question
  useEffect(() => {
    dispatch(setCurrentAnswerId(null));
    setIsLoadingAI(false);
    setShowTips(false);
=======
  useEffect(() => {
    if (user?.id) {
      console.log(user.id);
      dispatch(setCurrentUserId(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(setCurrentAnswerId(null));
    setIsLoadingAI(false);
    setShowTips(true);
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  }, [currentIndex]);

  useEffect(() => {
    if (questions.length > 0) {
      dispatch(setQuestions(questions));
      dispatch(goToQuestion(0));
    }
  }, [questions, dispatch]);

<<<<<<< HEAD
  if (isLoading) return <p className="p-8 text-center">טוען שאלות...</p>;
=======
  useEffect(() => {
    if (currentAnswerId) {
      setIsLoadingAI(true);
    }
  }, [currentAnswerId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">טוען שאלות...</p>
        </div>
      </div>
    );
  }
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

  const handleAnswerSaved = (answerId: string) => {
    const q = questions[currentIndex];
    dispatch(
      addAnsweredAnswer({
        id: answerId,
        question: { id: String(q.id), text: q.title || q.text },
      })
    );
<<<<<<< HEAD
    dispatch(setCurrentAnswerId(answerId)); // עדכון הסטייט של currentAnswerId
    setIsLoadingAI(true);
    setTimeout(() => {
      setIsLoadingAI(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[--color-background]">
      <CategoryDropdown />
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <div className="w-full max-w-2xl space-y-8">
          {questionsWithStatus[currentIndex] ? (
            <Question
              question={questionsWithStatus[currentIndex]}
              onFinishRecording={() => setShowTips(true)}
              onAnswerSaved={handleAnswerSaved}
            />
          ) : (
            <div>אין שאלות להצגה</div>
          )}
        </div>
        <div className="mt-8 w-full max-w-2xl">
          <EndSurvey
            showEndButton={allAnswered}
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
          />
        </div>
      </main>
      <aside className="w-64 flex-shrink-0 border-l border-[--color-border] bg-white shadow-md z-10">
        <Sidebar
          questions={questionsWithStatus}
          currentIndex={currentIndex}
          onNavigate={(index) => dispatch(goToQuestion(index))}
        />
      </aside>

      {/* Left Panel - Tips & AI Analysis */}
      <aside className="w-96 flex-shrink-0 border-r border-[--color-border] bg-white shadow-lg overflow-y-auto order-1">
        <div className="p-6 space-y-6">
          {/* Tips Section */}
          {showTips && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-800">טיפים לשיפור</h3>
              </div>
              <TipsComponent />
            </div>
          )}

          {/* AI Loading */}
          {isLoadingAI && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-purple-800">מנתח תשובה...</h3>
              </div>
              <MagicLoader />
            </div>
          )}

          {/* AI Analysis */}
          {currentAnswerId && !isLoadingAI && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-green-800">ניתוח AI</h3>
              </div>
              {/* <AnswerAI answerId={currentAnswerId} /> */}
              <AnswerAI answerId={"1379f739-611b-4b7e-b84a-77fca43f7489"} />

            </div>
          )}
        </div>
      </aside>
=======

    setNotification({
      message: "התשובה נשמרה בהצלחה!",
      type: "success",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    });
    setNotificationOpen(true);

    setTimeout(() => {
      setNotification(null);
      setNotificationOpen(false);
      dispatch(setCurrentAnswerId(answerId));
    }, 3500);
  };

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8">

        {/* Category Dropdown */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-sm">
            <CategoryDropdown />
          </div>
        </div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  {/* Sidebar */}
  <div className="lg:col-span-3">
    <div className="sticky top-8">
      <Sidebar
        questions={questionsWithStatus}
        currentIndex={currentIndex}
        onNavigate={(index) => dispatch(goToQuestion(index))}
      />
    </div>
  </div>

  {/* Main Question Area */}
  <div className="lg:col-span-9">
    <div className="space-y-6">
      {questionsWithStatus[currentIndex] ? (
        <div className="p-4 md:p-6 lg:p-8">
          <Question
            question={questionsWithStatus[currentIndex]}
            onFinishRecording={() => setShowTips(true)}
            onAnswerSaved={handleAnswerSaved}
            onNavigate={(index) => dispatch(goToQuestion(index))}
          />
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-red-500 text-lg">אין שאלות להצגה</p>
        </div>
      )}
              


               {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* AI Analysis Button */}
                {isCurrentQuestionAnswered && !currentAnswerId && !notificationOpen && (

<Button
  variant="primary-dark"
  size="md"
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  }
  iconPosition="left"
  onClick={() => {
    const answered = answeredAnswers.find(
      (a) => a.question.id === questionsWithStatus[currentIndex].id
    );
    if (answered) {
      dispatch(setCurrentAnswerId(answered.id));
    }
  }}
  className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
>
  הצג ניתוח AI
</Button>
                  )}

                {/* End Survey */}
                <EndSurvey
                  showEndButton={allAnswered}
                  answeredCount={answeredCount}
                  totalQuestions={totalQuestions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Component - Fixed Position */}
      <div className="fixed bottom-6 left-6 z-30">
        {showTips ? (
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-5 w-80 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                טיפים שימושיים
              </h3>
              <button
                onClick={() => setShowTips(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <TipsComponent />
          </div>
        ) : (
          <button
            onClick={() => setShowTips(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
            title="הצג טיפים"
          >
            <Lightbulb className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Success Notification */}
      {notification && notificationOpen && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 flex items-center gap-3">
            {notification.icon}
            <span className="text-gray-800 font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* AI Analysis Modal */}
      {currentAnswerId && !notificationOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">ניתוח AI לתשובה</h2>
              <button
                onClick={() => dispatch(setCurrentAnswerId(null))}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {isLoadingAI ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-purple-800 mb-6">מנתח תשובה...</h3>
                  <MagicLoader />
                </div>
              ) : (
                <AnswerAI
                  answerId={currentAnswerId}
                  onClose={() => dispatch(setCurrentAnswerId(null))}
                  onLoaded={() => setIsLoadingAI(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    </div>
  );
};

<<<<<<< HEAD
export default InterviewPage;
=======
export default InterviewPage;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
