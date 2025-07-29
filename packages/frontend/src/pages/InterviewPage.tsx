import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useGetQuestionsByCategoryQuery } from "../features/interview/services/questionsApi";
import {
  setQuestions,
  goToQuestion,
  setCurrentAnswerId,
  setCurrentUserId,
} from "../features/interview/store/simulationSlice";
import { RootState } from "../shared/store/store";
import Sidebar from "../features/interview/components/sidebar";
import Question from "../features/interview/components/question";
import TipsComponent from "../features/interview/components/tipsComponent";
import EndSurvey from "../features/interview/components/endSurvey";
import { skipToken } from "@reduxjs/toolkit/query";
import { X } from "lucide-react";
import { Button } from "../shared/ui/button";
import CategoryTabs from "../features/interview/components/showCategories";
import { useGetAnsweredQuestionsQuery } from "../features/interview/services/statusAPI";
import { AI_Insight } from "../features/interview/components/AI-Insight";
import ShowAI_Insight from "../features/interview/components/showAI_Insight";

const InterviewPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const { currentCategoryId, currentIndex, currentAnswerId } = useSelector(
    (state: RootState) => state.simulation
  );
  const { data: questions = [], isLoading } =
    useGetQuestionsByCategoryQuery(currentCategoryId || skipToken, {
      refetchOnMountOrArgChange: true,
    });
  const {
    data: answeredIdsFromServer = [],
    isSuccess,
    refetch: refetchAnswered
  } = useGetAnsweredQuestionsQuery(
    user && currentCategoryId
      ? { userId: user.id, categoryId: currentCategoryId }
      : skipToken
  );
  // הסר את answeredAnswers מה-state
  const [showTips, setShowTips] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    icon?: React.ReactNode;
  } | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // עדכון יוזר נוכחי ב-simulationSlice
  useEffect(() => {
    if (user?.id) {
      dispatch(setCurrentUserId(user.id));
    }
  }, [user, dispatch]);

  // איפוס currentAnswerId, טעינת AI וטיפים בכל מעבר שאלה
  useEffect(() => {
    dispatch(setCurrentAnswerId(null));
    setIsLoadingAI(false);
    setShowTips(true);
  }, [currentIndex, dispatch]);

  // עדכון שאלות ב-simulationSlice בכל טעינת שאלות
  useEffect(() => {
    if (questions.length > 0) {
      dispatch(setQuestions(questions));
      dispatch(goToQuestion(0));
    }
  }, [questions, dispatch]);

  // הפעלת טעינת AI כאשר יש currentAnswerId
  useEffect(() => {
    if (currentAnswerId) {
      setIsLoadingAI(true);
    }
  }, [currentAnswerId]);

  // עדכון תשובות שנענו מהשרת
  useEffect(() => {
    if (isSuccess && answeredIdsFromServer) {
      const answeredArr = answeredIdsFromServer.map((qid: any) => ({
        id: String(qid.id),
        question: { id: String(qid.id) }
      }));
    }
  }, [isSuccess, answeredIdsFromServer]);

  // עדכון תשובה שנשמרה
  const handleAnswerSaved = (answerId: string) => {
    const q = questions[currentIndex];
    // setNotification({
    //   message: "התשובה נשמרה בהצלחה!",
    //   type: "success",
    //   icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    // });
    setNotificationOpen(true);
    setTimeout(() => {
      setNotification(null);
      setNotificationOpen(false);
      dispatch(setCurrentAnswerId(answerId));
      refetchAnswered(); // רענון תשובות מהשרת
    }, 3500);
  };

  // בניית רשימת תשובות שנענו ישירות מהשרת
  const answeredQuestionIds = useMemo(
    () => (answeredIdsFromServer || []).map((a: any) => String(a.id)),
    [answeredIdsFromServer]
  );
  const questionsWithStatus = useMemo(
    () =>
      questions.map((q) => ({
        ...q,
        answered: answeredQuestionIds.includes(String(q.id)),
      })),
    [questions, answeredQuestionIds]
  );
  const isCurrentQuestionAnswered = questionsWithStatus[currentIndex]?.answered;
  const totalQuestions = questions.length;
  const answeredCount = questionsWithStatus.filter((q) => q.answered).length;
  const allAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

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

  return (
    <div className="w-full min-h-screen bg-[--color-background]">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8">

        {/* טאבים */}  
        <CategoryTabs />

        {/* כרטיס - כל התוכן */}
<div className="relative bg-[#e6fcf7] shadow-xl rounded-3xl   p-6 lg:p-10 min-h-[80vh] pb-32">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    {/* סיידבר */}
    <div className="lg:col-span-3">
      <div className="sticky top-12">
        <Sidebar
          questions={questionsWithStatus}
          currentIndex={currentIndex}
          onNavigate={(index) => dispatch(goToQuestion(index))}
        />
      </div>
    </div>
    {/* שאלה ופעולות */}
    <div className="lg:col-span-9 space-y-2">
      {questionsWithStatus[currentIndex] ? (
        <div className="p-4 md:p-4 lg:p-6">
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
      {/* כפתורי פעולה */}
       <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
       {/* <div className="flex  items-center gap-4 mt-4"> */}
        {/* {isCurrentQuestionAnswered && !notificationOpen && ( */}
          <ShowAI_Insight showButton={isCurrentQuestionAnswered && !notificationOpen} />
        {/* // )} */}

          <EndSurvey
            showEndButton={allAnswered}
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
          />
          </div>
        {/* טיפים בתוך הכרטיס */}
          <TipsComponent />
      </div>
    </div>
  </div>
</div>
        {/* התראה על שמירה */}
        {notification && notificationOpen && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
            <div className="bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 flex items-center gap-3">
              {notification.icon}
              <span className="text-gray-800 font-medium">{notification.message}</span>
            </div>
          </div>
        )}
        {/* ניתוח AI */}
        {currentAnswerId && !notificationOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
              <div className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-primary-dark))] text-white p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">ניתוח AI לתשובה</h2>
                <button
                  onClick={() => dispatch(setCurrentAnswerId(null))}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <AI_Insight/>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default InterviewPage;
