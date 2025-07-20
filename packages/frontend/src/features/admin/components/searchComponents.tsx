import React from 'react';
import { cn } from '../../../shared/utils/cn';

export const SearchComponents = (props: {
  searchText: string;
  setSearchText: (text: string) => void;
}) => {
  const { searchText, setSearchText } = props;

  return (
    <div className="my-4 flex justify-center">
      <div className="relative w-96">
        <input
          type="text"
          placeholder="חפש שאלה"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={cn(
            "px-4 py-3 pl-12 w-full rounded-lg border border-border text-base bg-white",
            "shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-primary-dark",
            "transition-colors duration-200 placeholder:text-text-secondary",
            "hover:bg-primary-dark/5 hover:border-primary-dark"
          )}
        />
        <div
          className={cn(
            "absolute left-2 top-1/2 transform -translate-y-1/2",
            "w-8 h-8 rounded-md flex items-center justify-center",
            "bg-primary-dark text-white",
            "pointer-events-none",
            "transition-colors duration-200"
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};