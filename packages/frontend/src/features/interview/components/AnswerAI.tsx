import { useEffect } from "react";
import { useFeedbackAnalysis } from "../hooks/useFeedbackAnalysis";
import FeedbackDisplay from "./FeedbackDisplay";
import MagicLoader from "./MagicLoader";
import { X } from "lucide-react";

interface AnswerAIProps {
  answerId: string;
  onClose: () => void;
  onLoaded?: () => void
}

const AnswerAI: React.FC<AnswerAIProps> = ({ answerId, onClose, onLoaded }) => {
  const { analysis, loading } = useFeedbackAnalysis(answerId);

  useEffect(() => {
  if (analysis) {
    onLoaded?.(); // ברגע שסיים לטעון
  }
}, [analysis]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative animate-fade-in">
        {/* כפתור סגירה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        {/* תוכן */}
        {loading ? (
          <MagicLoader />
        ) : analysis ? (
          <FeedbackDisplay analysis={analysis} />
        ) : (
          <p className="text-red-500 text-center">לא התקבלה תוצאה.</p>
        )}
      </div>
    </div>
  );
};

export default AnswerAI;
