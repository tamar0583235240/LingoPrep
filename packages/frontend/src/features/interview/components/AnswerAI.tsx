import { useEffect, useState } from "react";
import { analyzeInterview } from "../services/analyze.service";
import FeedbackDisplay from "./FeedbackDisplay";
import MagicLoader from "./MagicLoader";
import { X } from "lucide-react";
interface AnswerAIProps {
  answerId: string;
  audioFile: File; 
  onClose?: () => void;
  onLoaded?: () => void;
}
const AnswerAI: React.FC<AnswerAIProps> = ({ answerId, audioFile, onClose, onLoaded }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // useEffect(() => {
  //   if (answerId && audioFile) {
  //     setLoading(true);
  //     console.log('[AnswerAI] שולח ל-analyzeInterview', { answerId, audioFile });
  //     analyzeInterview(audioFile, answerId)
  //       .then(result => {
  //         console.log('[AnswerAI] קיבלתי תוצאה מהשרת:', result);
  //         setAnalysis(result);
  //         setLoading(false);
  //         onLoaded?.();
  //       })
  //       .catch(err => {
  //         console.error('[AnswerAI] שגיאה בניתוח:', err);
  //         setAnalysis("שגיאה בניתוח");
  //         setLoading(false);
  //       });
  //   }
  // }, [answerId, audioFile]);

  useEffect(() => {
    if (!loading && !analysis && retryCount < maxRetries) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, analysis, retryCount]);

  const content = (
    <>
      {loading ? (
        <div className="p-6">
          <MagicLoader />
          <p className="text-center mt-4 text-gray-600">
            {retryCount > 0 ? `מנסה שוב... (${retryCount}/${maxRetries})` : "מנתח את התשובה..."}
          </p>
        </div>
      ) : analysis ? (
        <FeedbackDisplay analysis={analysis} />
      ) : (
        <div className="p-6">
          <p className="text-red-500 text-center font-medium">
            {retryCount >= maxRetries ? "לא הצלחנו לקבל ניתוח. נסה שוב מאוחר יותר." : "מחכה לניתוח..."}
          </p>
          {retryCount >= maxRetries && (
            <p className="text-gray-500 text-center text-sm mt-2">
              נראה שיש בעיה בקבלת הניתוח. אנא רענן את הדף או נסה שוב.
            </p>
          )}
        </div>
      )}
    </>
  );
  // אם יש onClose, נציג את הקומפוננטה כמודל
  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative animate-fade-in">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition"
          >
            <X size={20} />
          </button>
          {content}
        </div>
      </div>
    );
  }
  // אחרת נציג כקומפוננטה רגילה
  return (
    <div className="bg-white rounded-xl shadow-sm">
      {content}
    </div>
  );
};
export default AnswerAI;