import { useEffect } from "react";
import { useFeedbackAnalysis } from "../hooks/useFeedbackAnalysis";
import FeedbackDisplay from "./FeedbackDisplay";
import MagicLoader from "./MagicLoader";

interface AnswerAIProps {
  answerId: string;
}

const AnswerAI: React.FC<AnswerAIProps> = ({ answerId }) => {
  const { analysis, loading } = useFeedbackAnalysis(answerId);
  return (
    <div className="min-h-screen p-6 bg-white">
      {loading ? (
        <MagicLoader />
      ) : analysis ? (
        <FeedbackDisplay analysis={analysis} />
      ) : (
        <p className="text-red-500 text-center">לא התקבלה תוצאה.</p>
      )}
    </div>
  );
};

export default AnswerAI;
