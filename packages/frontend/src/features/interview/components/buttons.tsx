import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hook';
// import { answeredQuestions, nextQuestion, resetQuestion } from '../store/simulationSlice';
import { RootState } from '../../../shared/store/store';
import { RotateCcw, Sparkles } from 'lucide-react';
import { interviewType } from '../types/questionType';

interface ButtonsProps {
  onShowAnalysis: () => void;
  analysisVisible: boolean;
}

const Buttons: React.FC<ButtonsProps> = ({
  onShowAnalysis,
  analysisVisible,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { questions, currentIndex } = useAppSelector(
    (state: RootState) => state.simulation
  );
  const [showEnd, setShowEnd] = useState(false);
  const currentQuestion = questions[currentIndex];
  const answeredCount = questions.filter((q: interviewType) => q.answered).length;

  // const handleTextChange = (value: string) => {
  //   // dispatch(answeredQuestions({ index: currentIndex, answer: value }));
  // };
  // const handleReset = () => {
  //   // dispatch(resetQuestion(currentIndex));
  // };



  return (
    <div className="flex flex-col items-center gap-4 mt-4">
     

      {answeredCount === questions.length && (
        <button
          className="relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[--color-primary] text-white font-bold text-xl shadow-md hover:bg-[--color-primary-dark] transition-all duration-200 border border-[--color-border] mt-6"
          onClick={() => setShowEnd(true)}
          style={{ minWidth: 220 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-white ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Heroicon: CheckBadge */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          סיום השאלון
        </button>
      )}

      <button
        className="text-primary-dark underline"
        onClick={() => setShowEnd(true)}
      >
        סיום השאלון
      </button>

      {showEnd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-card w-full max-w-md text-right">
            <button
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEnd(false)}
            >
              X
            </button>
            <p className="text-lg font-bold mb-4">ברכות לרגל סיום השאלון!</p>
            <div className="flex gap-2">
              <button
                className="bg-primary-dark text-white px-4 py-2 rounded-lg"
                onClick={() => navigate("/certificate")}
              >
                הנפקת תעודה
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg"
                onClick={() => navigate("/dashboard")}
              >
                דשבורד
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buttons;
