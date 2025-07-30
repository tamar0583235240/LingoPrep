import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import CodeRunner, { Language } from './CodeRunner';
import { useDeleteUserAnswerMutation, useSaveUserAnswerMutation, useUpdateQuestionStatusMutation } from "../../../shared/api/runCodeApi";


interface AnswerModalProps {
    question: {
        id: string;
        content: string;
        type: string;
    };
    userId: string;
    userAnswer: {
        answer: string;
        code_language: string;
        status: "not_started" | "in_progress" | "completed";
    };
    onClose: () => void;
    onStatusChange: (id: string, newStatus: "not_started" | "in_progress" | "completed") => void;
    refetchUserAnswer: () => Promise<any>;
}

const initialCodeMap: Record<Language, string> = {
    java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`,
    python: `print("Hello, Python!")`,
    sql: `SELECT 'Hello, SQL!' AS message;`,
    html: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Hello HTML</title>\n  </head>\n  <body>\n    <h1>Hello, HTML!</h1>\n  </body>\n</html>`,
    c: `#include <stdio.h>\n\nint main() {\n  printf("Hello, C!\\n");\n  return 0;\n}`,
    cpp: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}`,
    javascript: `console.log("Hello, JavaScript!");`,
};


export const AnswerModal = ({ question, userId, userAnswer, onClose, onStatusChange, refetchUserAnswer }: AnswerModalProps) => {
    const [answer, setAnswer] = useState("");
    const [updateQuestionStatus] = useUpdateQuestionStatusMutation();
    const [saveUserAnswer] = useSaveUserAnswerMutation();
    const [deleteUserAnswer] = useDeleteUserAnswerMutation();
    const [codeLanguage, setCodeLanguage] = useState<Language | undefined>(undefined);


    useEffect(() => {
        if (!userAnswer) return;

        const lang = userAnswer.code_language as Language;

        if (question.type === "code") {
            setCodeLanguage(lang ?? "java");

            const codeToShow =
                userAnswer.status === "in_progress"
                    ? userAnswer.answer
                    : initialCodeMap[lang] ?? "";

            setAnswer(codeToShow);
        } else if (question.type === "free_text" || question.type === "yes_no") {
            const answerToShow =
                userAnswer.status === "in_progress"
                    ? userAnswer.answer
                    : "";

            setAnswer(answerToShow);
            setCodeLanguage(undefined);
        }
    }, [userAnswer, question.type]);


    const renderInput = () => {
        switch (question.type) {
            case "yes_no":
                return (
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => setAnswer("כן")}
                            className={`px-4 py-2 rounded border ${answer === "כן" ? "bg-green-200" : ""}`}
                        >
                            כן
                        </button>
                        <button
                            onClick={() => setAnswer("לא")}
                            className={`px-4 py-2 rounded border ${answer === "לא" ? "bg-red-200" : ""}`}
                        >
                            לא
                        </button>
                    </div>
                );
            case "free_text":
                return (
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full border mt-4 p-2 rounded"
                        rows={4}
                        placeholder="כתבי את תשובתך כאן..."
                    />
                );
            case "code":
                return (
                    <div className="mt-4 w-full h-[450px]">
                        <CodeRunner
                            language={codeLanguage ?? 'java'}
                            code={answer}
                            onChangeCode={(code) => setAnswer(code)}
                            onChangeLanguage={(lang) => setCodeLanguage(lang)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    // כפתור ביטול - סטטוס - לא התחיל
    const handleCancel = async () => {
        try {
            // עדכון סטטוס ל-not_started
            await updateQuestionStatus({
                userId,
                questionId: question.id,
                status: "not_started",
            }).unwrap();

            // מחיקת תשובת המשתמש מהשרת
            await deleteUserAnswer({
                userId,
                questionId: question.id,
            }).unwrap();

            refetchUserAnswer();
            setAnswer("");

            onStatusChange(question.id, "not_started");
        } catch (error) {
            console.error("Error resetting question:", error);
        } finally {
            onClose();
        }
    };

    // כפתור שמור להמשך - סטטוס - בתהליך
    const saveProgress = async () => {
        console.log(answer);
        try {
            await updateQuestionStatus({
                userId,
                questionId: question.id,
                status: "in_progress",
            }).unwrap();

            onStatusChange(question.id, "in_progress");

            if (answer) {
                await saveUserAnswer({
                    userId,
                    questionId: question.id,
                    answer,
                    codeLanguage: question.type === 'code' ? codeLanguage : undefined,
                });
            }

            onClose();
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };

    // כפתור שמירה - סטטוס - הושלם
    const submitAnswer = async () => {
        try {
            await updateQuestionStatus({
                userId,
                questionId: question.id,
                status: "completed",
            }).unwrap();

            onStatusChange(question.id, "completed");

            if (answer) {
                await saveUserAnswer({
                    userId,
                    questionId: question.id,
                    answer,
                    codeLanguage: question.type === 'code' ? codeLanguage : undefined,
                });
            }

            onClose();
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-30" />
            <div className="bg-white rounded p-6 z-10 w-full max-w-5xl text-right">
                <Dialog.Title className="text-lg font-bold text-[--color-text] mb-2">
                    ענה על השאלה
                </Dialog.Title>
                <p className="mb-4">{question.content}</p>

                {renderInput()}

                <div className="flex justify-between items-center mt-6">
                    <div className="relative group">
                        <button
                            onClick={handleCancel}
                            className="text-sm text-red-600 hover:text-red-700 font-medium transition"
                        >
                            ביטול
                        </button>

                        {/* הודעה שרק מופיעה על hover */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 hidden group-hover:block bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded shadow w-64 text-right z-10">
                            שימי לב: בלחיצה על "ביטול" התשובה תימחק.<br />
                            כדי לשמור ולהמשיך מאוחר יותר, לחצי על "שמור להמשך".
                        </div>
                    </div>

                    {/* כפתורי שמירה וסיום */}
                    <div className="flex gap-3">
                        <button
                            onClick={saveProgress}
                            className="border border-[--color-primary] text-[--color-primary] px-4 py-2 rounded hover:bg-[--color-primary]/10 transition"
                        >
                            שמור להמשך
                        </button>

                        <button
                            onClick={submitAnswer}
                            className="bg-[--color-primary] text-white px-4 py-2 rounded hover:bg-[--color-primary-dark] transition"
                        >
                            סיימתי!
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
