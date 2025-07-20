import React from 'react';
import { cn } from '../../../shared/utils/cn';

export const SortComponents = (props: {
  sortOption: string;
  setSortOption: (value: string) => void;
}) => {
  const { sortOption, setSortOption } = props;

  return (
    <div className="flex justify-start mb-4 mt-4 max-w-2xl mx-auto
                   xl:max-w-3xl
                   lg:max-w-2xl  
                   md:max-w-xl
                   sm:max-w-lg
                   max-sm:max-w-sm" dir="rtl">
      <div className="flex items-center gap-3">
        <span className="font-bold text-text-main">מיין לפי:</span>
        <select
          className={cn(
            "px-2 py-2 rounded-lg border border-border text-base bg-white w-64",
            "shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-primary-dark",
            "transition-colors duration-200"
          )}
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="latest">מהחדש לישן</option>
          <option value="oldest">מהישן לחדש</option>
          <option value="mostFeedbacks">כמות פידבקים מגבוה לנמוך</option>
          <option value="leastFeedbacks">כמות פידבקים מהנמוך לגבוה</option>
        </select>
      </div>
    </div>
  );
};
