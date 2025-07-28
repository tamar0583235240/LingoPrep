import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared/store/store';
import { Lightbulb, X } from 'lucide-react';
const TipsComponent: React.FC = () => {
  const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
  const currentQuestion = questions[currentIndex];
  const [showTips, setShowTips] = useState(true);
  if (!currentQuestion?.tips) return null;
  return (
    <div className="absolute bottom-6 left-6 z-30">
      {showTips ? (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-72 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 text-right">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              טיפים שימושיים
            </h3>
            <button
              onClick={() => setShowTips(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div dir="rtl">
            <div className="bg-blue-100/50 rounded-lg p-3 text-blue-900 leading-relaxed">
              <p className="text-sm leading-6 text-center">{currentQuestion.tips}</p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowTips(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
          title="הצג טיפים"
        >
          <Lightbulb className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
export default TipsComponent;