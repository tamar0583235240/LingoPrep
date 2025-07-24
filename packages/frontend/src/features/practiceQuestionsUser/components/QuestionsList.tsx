import { useEffect, useState } from "react";
import { FiEdit3, FiMail } from "react-icons/fi";
import { QuestionStatus } from "./QuestionStatus";
import { AnswerModal } from "./AnswerModel";
import { LikeDislike } from "./LikeDislike";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { SendMailModal } from "./SendMailModal";
import { useGetUserAnswerQuery, useSendEmailMutation } from "../../../shared/api/runCodeApi";
import Swal from "sweetalert2";
import { skipToken } from "@reduxjs/toolkit/query";

interface Question {
  id: string;
  content: string;
  difficulty: string;
  type: string;
}

type Status = "not_started" | "in_progress" | "completed";

interface Props {
  topicName: string;
  level: string;
  type: string;
}

export const QuestionsList = ({ topicName, level, type }: Props) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, Status>>({});
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // const { data: userAnswer, isLoading, error } = useGetUserAnswerQuery(
  //   selectedQuestion
  //     ? { userId, questionId: selectedQuestion.id }
  //     : skipToken // דילוג אם אין עדיין שאלה
  // );

  const {
    data: userAnswer,
    isLoading,
    error,
    refetch
  } = useGetUserAnswerQuery(
    selectedQuestion
      ? { userId, questionId: selectedQuestion.id }
      : skipToken
  );

  const [mailQuestion, setMailQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sendEmail, { isLoading: sendingEmail }] = useSendEmailMutation();

  useEffect(() => {
    if (selectedQuestion) {
      refetch();
    }
  }, [selectedQuestion]);

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case "easy":
        return "קל";
      case "medium":
        return "בינוני";
      case "hard":
        return "קשה";
      default:
        return level;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "code":
        return "קוד";
      case "free_text":
        return "טקסט חופשי";
      case "yes_no":
        return "כן / לא";
      default:
        return type;
    }
  };

  // שליפת השאלות
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (topicName) queryParams.append("topic", topicName);
        if (level) queryParams.append("level", level);
        if (type) queryParams.append("type", type);

        const res = await fetch(`http://localhost:5000/api/codeQuestions/questions?${queryParams.toString()}`);
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("שגיאה בשליפת שאלות:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [topicName, level, type]);

  // שליפת סטטוסים לפי משתמש
  useEffect(() => {
    const fetchStatuses = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/codeQuestions/getQuestionStatus/${userId}`);
        const response = await res.json();
        const data: { question_id: string; status: Status }[] = response.data;

        const statusMap: Record<string, Status> = {};
        data.forEach(({ question_id, status }) => {
          statusMap[question_id] = status;
        });

        console.log("data from server", data);
        console.log("mapped status map", statusMap);

        setQuestionStatuses(statusMap);
      } catch (error) {
        console.error("שגיאה בשליפת סטטוס שאלות:", error);
      }
    };

    fetchStatuses();
  }, [userId]);

  // const handleStatusChange = (id: string, newStatus: Status) => {
  //   setQuestionStatuses((prev) => ({
  //     ...prev,
  //     [id]: newStatus,
  //   }));

  //   if (selectedQuestion?.id === id) {
  //     setSelectedQuestion(null);
  //   }
  // };

  const handleStatusChange = async (id: string, newStatus: Status) => {
    setQuestionStatuses((prev) => ({
      ...prev,
      [id]: newStatus,
    }));

    // אם השאלה שנבחרה היא זו שמשתנה, אפשר לסגור את המודל (כבר קיים)
    if (selectedQuestion?.id === id) {
      setSelectedQuestion(null);
    }

    // כאן תפעילי את הריפטש של התשובה כדי לעדכן את ה-props ל-AnswerModal
    if (id === selectedQuestion?.id) {
      await refetch();
    }
  };


  return (
    <div dir="rtl" className="mt-6">
      {loading ? (
        <p>טוען שאלות...</p>
      ) : questions.length === 0 ? (
        <p>לא נמצאו שאלות תואמות.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => {
            const status = questionStatuses[q.id] ?? "not_started";
            return (
              <li
                key={q.id}
                className="border rounded p-4 shadow text-right bg-white space-y-3"
              >
                <div className="flex justify-between items-center gap-4">
                  {/* תוכן השאלה */}
                  <div className="flex-1 space-y-2 self-start">
                    <p className="text-lg font-semibold text-[--color-primary-dark]">{q.content}</p>
                    <p className="text-sm text-gray-600">
                      רמת קושי: <span className="font-bold">{getDifficultyLabel(q.difficulty)}</span> | אופן המענה:{" "}
                      <span className="font-bold">{getTypeLabel(q.type)}</span>
                    </p>

                    <QuestionStatus value={status} />

                    {userId && (
                      <LikeDislike questionId={q.id} userId={userId} />
                    )}
                  </div>

                  {/* כפתורים ממורכזים אנכית */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setSelectedQuestion(q)}
                      className="group w-36 h-10 flex-shrink-0 flex items-center justify-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-dark] active:scale-95 text-white text-sm font-medium rounded-md transition-transform duration-200 shadow-sm"
                    >
                      <FiEdit3 className="text-base group-hover:translate-x-1 transition-transform duration-200" />
                      התשובה שלך
                    </button>

                    {/* <button
                      onClick={() => setMailQuestion(q)}
                      
                      className={`group w-36 h-10 flex-shrink-0 flex items-center justify-center gap-2 ${answers[q.id]
                        ? "bg-green-600 hover:bg-green-700 active:scale-95"
                        : "bg-gray-300 cursor-not-allowed"
                        } text-white text-sm font-medium rounded-md transition-transform duration-200 shadow-sm`}
                    >
                      <FiMail className="text-base" />
                      שלח מייל
                    </button> */}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {selectedQuestion && userId && (
        <AnswerModal
          question={selectedQuestion}
          userId={userId}
          userAnswer={userAnswer}
          onClose={() => setSelectedQuestion(null)}
          onStatusChange={handleStatusChange}
          refetchUserAnswer={refetch}
        />
      )}

      {mailQuestion && (
        <SendMailModal
          questionContent={mailQuestion.content}
          answer={answers[mailQuestion.id] ?? "עדיין לא ענית על שאלה זו"}
          onClose={() => setMailQuestion(null)}
          onSend={async (email, message) => {
            try {
              const subject = `שאלה מעניינת בנושא ${topicName}`;

              // שליחת המייל
              await sendEmail({ to: email, subject, text: message }).unwrap();

              // הודעת הצלחה יפה
              Swal.fire({
                icon: 'success',
                title: 'המייל נשלח בהצלחה!',
                text: 'השאלה נשלחה לחבר שלך בדוא"ל.',
                confirmButtonText: 'סגור',
                // iconColor: '#00D6AD',
                confirmButtonColor: '#00B894',
              });

              setMailQuestion(null);
            } catch (error) {
              // הודעת שגיאה
              Swal.fire({
                icon: 'error',
                title: 'שגיאה בשליחת המייל',
                text: 'נסה שוב מאוחר יותר או בדוק את כתובת המייל.',
                confirmButtonText: 'סגור',
                // iconColor: '#64748B',
                confirmButtonColor: '#64748B',
              });
              console.error("Send email error:", error);
            }
          }}
        />
      )}
    </div >
  );
};
