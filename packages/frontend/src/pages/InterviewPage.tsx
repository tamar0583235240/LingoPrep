import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetQuestionsByCategoryQuery } from "../features/interview/services/questionsApi";
import Sidebar from "../features/interview/components/sidebar";
import Question from "../features/interview/components/question";
import AnswerAI from "../features/interview/components/AnswerAI";
import TipsComponent from "../features/interview/components/tipsComponent";
import MagicLoader from "../features/interview/components/MagicLoader";
import EndSurvey from "../features/interview/components/endSurvey";
import ShowCategories from "../features/interview/components/showCategories";
import { RootState } from "../shared/store/store";
import { addAnsweredAnswer } from "../features/interview/store/answeredSlice";

const InterviewPage = () => {
  const categoryId = "11111111-1111-1111-1111-111111111111";

  const {
    data: questions = [],
    isLoading,
    isError,
  } = useGetQuestionsByCategoryQuery(categoryId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [answerIdForAI, setAnswerIdForAI] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const dispatch = useDispatch();

  // נשלף מתוך ה־Redux Store (persisted)
  const answeredAnswers = useSelector(
    (state: RootState) => state.answered.answeredAnswers
  );

  // איפוס טיפים ותשובת AI בכל מעבר בין שאלות
  useEffect(() => {
    setShowTips(false);
    setAnswerIdForAI(null);
  }, [currentIndex]);

  // חישוב מזהים של שאלות שנענו
  const answeredQuestionIds = useMemo(() => {
    return Array.isArray(answeredAnswers)
      ? answeredAnswers
          .map((a) => a?.question?.id)
          .filter((id): id is string => typeof id === "string")
      : [];
  }, [answeredAnswers]);

  // מיזוג השאלות עם סטטוס נענו
  const questionsWithAnswered = useMemo(() => {
    return questions.map((q: any) => ({
      ...q,
      answered: answeredQuestionIds.includes(q.id),
    }));
  }, [questions, answeredQuestionIds]);

  if (isLoading) return <p className="p-8 text-center">טוען שאלות...</p>;
  if (isError || !questions.length)
    return <p className="p-8 text-center">שגיאה בטעינת שאלות</p>;

  const currentQuestion = questionsWithAnswered[currentIndex];

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[--color-background]">
      {/* אזור מרכזי */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        <ShowCategories />
        <div className="w-full max-w-2xl space-y-8">
          <Question
            question={currentQuestion}
            onFinishRecording={() => setShowTips(true)}
            onAnswerSaved={(id: string) => {
              const answeredQuestion = questions[currentIndex];

              dispatch(
                addAnsweredAnswer({
                  id,
                  question: {
                    id: answeredQuestion.id.toString(),
                    text: answeredQuestion.text,
                  },
                })
              );

              setIsLoadingAI(true);
              setTimeout(() => {
                setAnswerIdForAI(id);
                setIsLoadingAI(false);
              }, 2000);
            }}
          />

          {showTips && <TipsComponent />}
          {isLoadingAI && <MagicLoader />}
          {answerIdForAI && !isLoadingAI && (
            <AnswerAI answerId={answerIdForAI} />
          )}
        </div>

        <div className="mt-8 w-full max-w-2xl">
          <EndSurvey
            showEndButton={
              answeredQuestionIds.length === questions.length &&
              questions.length > 0
            }
            answeredCount={answeredQuestionIds.length}
            totalQuestions={questions.length}
          />
        </div>
      </main>

      {/* סיידבר */}
      <aside className="w-64 flex-shrink-0 border-l border-[--color-border] bg-white shadow-md z-10">
        <Sidebar
          questions={questionsWithAnswered}
          currentIndex={currentIndex}
          onNavigate={(index: number) => setCurrentIndex(index)}
        />
      </aside>
    </div>
  );
};

export default InterviewPage;
