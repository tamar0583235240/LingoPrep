// InterviewPage.tsx

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useGetQuestionsByCategoryQuery } from "../features/interview/services/questionsApi";
import {
  setQuestions,
  goToQuestion,
  setCurrentAnswerId,
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

const InterviewPage = () => {
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
  const [isLoadingAI, setIsLoadingAI] = useState(false);

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

  // Reset answerIdForAI & isLoadingAI when moving to another question
  useEffect(() => {
    dispatch(setCurrentAnswerId(null));
    setIsLoadingAI(false);
    setShowTips(false);
  }, [currentIndex]);

  useEffect(() => {
    if (questions.length > 0) {
      dispatch(setQuestions(questions));
      dispatch(goToQuestion(0));
    }
  }, [questions, dispatch]);

  if (isLoading) return <p className="p-8 text-center">טוען שאלות...</p>;

  const handleAnswerSaved = (answerId: string) => {
    const q = questions[currentIndex];
    dispatch(
      addAnsweredAnswer({
        id: answerId,
        question: { id: String(q.id), text: q.title || q.text },
      })
    );
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
    </div>
  );
};

export default InterviewPage;
