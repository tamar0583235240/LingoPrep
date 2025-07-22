import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared/store/store';

const TipsComponent: React.FC = () => {
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];

  if (!currentQuestion?.tips) return null;

  return (
    <div className="text-right" dir="rtl">
      <div className="bg-blue-100/50 rounded-lg p-4 text-blue-900 leading-relaxed">
        <span className="block text-sm font-medium mb-2 text-blue-800">
          💡 עצה מומלצת:</span>
        <p className="text-sm leading-6">
          {currentQuestion.tips}
        </p>
      </div>
    </div>
  );
};

export default TipsComponent;