// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../shared/store/store';
// import { Lightbulb } from 'lucide-react';
// import { CardSimple } from '../../../shared/ui/card';

// const TipsComponent: React.FC = () => {
//   const { questions, currentIndex } = useSelector((state: RootState) => state.simulation);
//   const currentQuestion = questions[currentIndex];

//   if (!currentQuestion?.tips) return null;

//   return (
//     <CardSimple className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md p-8 w-[520px] min-h-[120px] flex flex-col gap-4 mx-auto">
//       <div className="flex items-center gap-2 mb-3">
//         <Lightbulb className="w-6 h-6 text-yellow-400" />
//         <span className="font-bold text-lg text-gray-800">טיפים לתשובה</span>
//       </div>
//       <div className="bg-sky-100 rounded-xl px-6 py-8 text-base text-[#1B3A4B] leading-relaxed flex-1 flex items-start min-h-[64px] text-right" dir="rtl">
//         <span className="w-full" dir="rtl">{currentQuestion.tips}</span>
//       </div>
//     </CardSimple>
//   );
// };

// export default TipsComponent;
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
        <span className="block text-sm font-medium mb-2 text-blue-800">💡 עצה מומלצת:</span>
        <p className="text-sm leading-6">
          {currentQuestion.tips}
        </p>
      </div>
    </div>
  );
};

export default TipsComponent;
