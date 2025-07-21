<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useFeedbackAnalysis } from "../hooks/useFeedbackAnalysis";
import FeedbackDisplay from "./FeedbackDisplay";
import MagicLoader from "./MagicLoader";

interface AnswerAIProps {
  answerId: string;
}

const AnswerAI: React.FC<AnswerAIProps> = ({ answerId }) => {
  const { analysis, loading } = useFeedbackAnalysis(answerId);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    if (!loading && !analysis && retryCount < maxRetries) {
      // אם אין תוצאות, ננסה שוב אחרי 2 שניות
      const timer = setTimeout(() => {
        console.log('🔄 מנסה שוב לקבל ניתוח...', retryCount + 1);
        setRetryCount(prev => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, analysis, retryCount]);

  console.log('🎯 AnswerAI Props:', { answerId, loading, analysis });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {loading ? (
        <div className="p-6">
          <MagicLoader />
          <p className="text-center mt-4 text-gray-600">
            {retryCount > 0 ? `מנסה שוב... (${retryCount}/${maxRetries})` : 'מנתח את התשובה...'}
          </p>
        </div>
      ) : analysis ? (
        <FeedbackDisplay analysis={analysis} />
      ) : (
        <div className="p-6">
          <p className="text-red-500 text-center font-medium">
            {retryCount >= maxRetries ? 'לא הצלחנו לקבל ניתוח. נסה שוב מאוחר יותר.' : 'מחכה לניתוח...'}
          </p>
          {retryCount >= maxRetries && (
            <p className="text-gray-500 text-center text-sm mt-2">
              נראה שיש בעיה בקבלת הניתוח. אנא רענן את הדף או נסה שוב.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
=======
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
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

export default AnswerAI;
