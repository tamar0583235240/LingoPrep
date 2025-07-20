import React, { useState } from 'react';
import { Answer } from '../types/Answer';
import { TitleQuestions } from './question';
import { Button } from '../../../shared/ui/button';
import { cn } from '../../../shared/utils/cn';
import { Star } from 'lucide-react';

export const FilteringComponents = (props: {
  filterCriteria: {
    dateFilter: string;
    questionName: string;
    feedbackCategory: string;
    ratingFilter: number | null;
  };
  setFilterCriteria: (criteria: {
    dateFilter: string;
    questionName: string;
    feedbackCategory: string;
    ratingFilter: number | null;
  }) => void;
  originalAnswers: Answer[];
}) => {
  const { filterCriteria, setFilterCriteria, originalAnswers } = props;

  const [showDateFilters, setShowDateFilters] = useState(true);
  const [showQuestionFilters, setShowQuestionFilters] = useState(true);
  const [showFeedbackFilter, setShowFeedbackFilter] = useState(true);
  const [showRatingFilter, setShowRatingFilter] = useState(true);

  const uniqueQuestions = Array.from(new Set(originalAnswers.map(a => a.question_id)));

  const toggleDateFilter = (value: string) => {
    setFilterCriteria({ ...filterCriteria, dateFilter: value });
  };

  const toggleQuestionFilter = (value: string) => {
    setFilterCriteria({ ...filterCriteria, questionName: value });
  };

  const toggleFeedbackFilter = (value: string) => {
    setFilterCriteria({ ...filterCriteria, feedbackCategory: value });
  };

  const toggleRatingFilter = (value: number) => {
    setFilterCriteria({ ...filterCriteria, ratingFilter: value });
  };

  const clearFilters = () => {
    setFilterCriteria({
      dateFilter: 'all',
      questionName: '',
      feedbackCategory: '',
      ratingFilter: null,
    });
  };

  const renderStars = () => {
    const selectedRating = filterCriteria.ratingFilter || 0;
    return (
        <div className="flex gap-1 pr-2">
            {[1, 2, 3, 4, 5].map((num) => (
                <button
                    key={num}
                    type="button"
                    onClick={() => toggleRatingFilter(num)}
                    className="focus:outline-none"
                >
                    <span className={`text-2xl ${num <= selectedRating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {num <= selectedRating ? '★' : '☆'}
                    </span>
                </button>
            ))}
        </div>
    );
};
  return (
    <div className="fixed top-24 right-4 w-80 z-40 p-6 max-h-[calc(100vh-120px)] overflow-y-auto" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-text-main">סינון</h2>
        <Button
          variant="primary-dark"
          size="sm"
          onClick={clearFilters}
          className="text-xs"
        >
          נקה סינון
        </Button>
      </div>

      {/* Date Filter Section */}
      <div className="mb-8">
        <h4
          className="font-bold text-lg mb-3 text-primary-dark cursor-pointer flex items-center justify-between hover:text-primary-dark/80 transition-colors"
          onClick={() => setShowDateFilters(!showDateFilters)}
        >
          <span>תאריך</span>
          <span className="text-2xl font-bold">{showDateFilters ? '-' : '+'}</span>
        </h4>

        {showDateFilters && (
          <div className="flex flex-col gap-3 pr-2">
            {[
              { label: 'הכי חדשה', value: 'latest' },
              { label: 'מהשבוע האחרון', value: 'lastWeek' },
              { label: 'מהחודש האחרון', value: 'lastMonth' }
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
                <input
                  type="radio"
                  name="date"
                  checked={filterCriteria.dateFilter === value}
                  onChange={() => toggleDateFilter(value)}
                  className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
                />
                {label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Question Filter Section */}
      <div className="mb-8">
        <h4
          className="font-bold text-lg mb-3 text-primary-dark cursor-pointer flex items-center justify-between hover:text-primary-dark/80 transition-colors"
          onClick={() => setShowQuestionFilters(!showQuestionFilters)}
        >
          <span>שאלה</span>
          <span className="text-2xl font-bold">{showQuestionFilters ? '-' : '+'}</span>
        </h4>

        {showQuestionFilters && (
          <div className="flex flex-col gap-3 pr-2">
            {uniqueQuestions.map(q => (
              <label key={q} className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
                <input
                  type="radio"
                  name="question"
                  checked={filterCriteria.questionName === q}
                  onChange={() => toggleQuestionFilter(q)}
                  className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
                />
                <TitleQuestions data={q} />
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Filter Section */}
      <div className="mb-4">
        <h4
          className="font-bold text-lg mb-3 text-primary-dark cursor-pointer flex items-center justify-between hover:text-primary-dark/80 transition-colors"
          onClick={() => setShowFeedbackFilter(!showFeedbackFilter)}
        >
          <span>כמות פידבקים</span>
          <span className="text-2xl font-bold">{showFeedbackFilter ? '-' : '+'}</span>
        </h4>

        {showFeedbackFilter && (
          <div className="flex flex-col gap-3 pr-2">
            {[
              { label: 'ללא פידבק', value: 'none' },
              { label: '1–3 פידבקים', value: 'low' },
              { label: '4+', value: 'high' }
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center gap-3 text-sm text-text-main cursor-pointer hover:text-primary-dark transition-colors">
                <input
                  type="radio"
                  name="feedback"
                  checked={filterCriteria.feedbackCategory === value}
                  onChange={() => toggleFeedbackFilter(value)}
                  className="w-4 h-4 text-primary-dark focus:ring-primary-dark focus:ring-2"
                />
                {label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter Section */}
      <div className="mb-4">
        <h4
          className="font-bold text-lg mb-3 text-primary-dark cursor-pointer flex items-center justify-between hover:text-primary-dark/80 transition-colors"
          onClick={() => setShowRatingFilter(!showRatingFilter)}
        >
          <span>דירוג הקלטה</span>
          <span className="text-2xl font-bold">{showRatingFilter ? '-' : '+'}</span>
        </h4>
        
        {showRatingFilter && renderStars()}
      </div>
    </div>
  );
};
