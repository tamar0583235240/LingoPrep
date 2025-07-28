import { interviewType } from "../types/questionType";
import { ChevronUp, ChevronDown, Home } from "lucide-react";
interface SidebarProps {
  questions: interviewType[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  questions,
  currentIndex,
  onNavigate,
}) => {
  const answeredCount = questions.filter((q) => q.answered).length;
  const percentage = Math.round((answeredCount / questions.length) * 100);
  return (
    <div className="flex flex-col items-center py-4 px-1 h-full w-64 ">
      {/* סטטוס שאלה */}
      <div className="text-center text-lg font-semibold text-primary mb-3">
        {`${currentIndex + 1} מתוך ${questions.length}`}
      </div>
      {/* בר התקדמות */}
      <div className="w-full mb-4 px-2">
        <div className="text-xs text-text-secondary text-center mb-1">
          {percentage}% הושלמו
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-primary-dark rounded"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      {/* כפתור קודם */}
      <button
        onClick={() => onNavigate(currentIndex - 1)}
        className="text-primary hover:bg-primary/10 border border-transparent hover:border-primary rounded-md px-3 py-1 transition mb-2"
        aria-label="שאלה קודמת"
        disabled={currentIndex === 0}
      >
        <ChevronUp size={18} />
      </button>
      {/* רשימת שאלות */}
      <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-[300px] px-2 mb-2">
         {questions.map((q, i) => {
           const isCurrent = i === currentIndex;
           const isAnswered = q.answered;
           return (
            <button
              key={q.id}
              onClick={() => onNavigate(i)}
              className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold transition
                ${
                  isCurrent
                    ? "bg-primary text-white shadow"
                    : isAnswered
                    ? "bg-primary/20 text-primary border border-primary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
              title={`שאלה ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      {/* כפתור הבא */}
      <button
        onClick={() => onNavigate(currentIndex + 1)}
        className="text-primary hover:bg-primary/10 border border-transparent hover:border-primary rounded-md px-3 py-1 transition mt-2"
        aria-label="שאלה הבאה"
        disabled={currentIndex === questions.length - 1}
      >
        <ChevronDown size={18} />
      </button>
      {/* חזור לעמוד הבית */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition flex items-center gap-2 text-sm"
      >
        <Home size={16} />
        חזור לעמוד הבית
      </button>
    </div>
  );
};
export default Sidebar;