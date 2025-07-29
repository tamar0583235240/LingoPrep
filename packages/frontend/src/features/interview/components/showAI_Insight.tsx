import React, { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../shared/hooks/reduxHooks';
// import { RootState } from '../../../shared/store/store';
// import { RotateCcw, Sparkles, X } from 'lucide-react';
// import { interviewType } from '../types/questionType';
// import { Certificate } from '../../dashboard/components/Certificate';
import { Button } from "../../../shared/ui/button";

interface showAI_InsightProps {
  showButton: boolean;
//   analysisVisible: boolean;
}

const showAI_Insight: React.FC<showAI_InsightProps> = ({
    showButton,
}) => {
//   const dispatch = useAppDispatch();
//   const { questions, currentIndex } = useAppSelector(
//     (state: RootState) => state.simulation
//   );
//   const user = useAppSelector((state: RootState) => state.auth.user);
//   const [showEnd, setShowEnd] = useState(false);
//   const [showCertificate, setShowCertificate] = useState(false);
//   const currentQuestion = questions[currentIndex];
//   const answeredCount = questions.filter((q: interviewType) => q.answered).length;

  return (
    <div>
        {showButton && (
            <Button
                variant="primary-dark"
                size="md"
                icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                </svg>
                }
                iconPosition="left"
                onClick={() => {
                
                }}
                className="hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
                הצג ניתוח AI
          </Button>
        )}
    </div>
  );
};

export default showAI_Insight;