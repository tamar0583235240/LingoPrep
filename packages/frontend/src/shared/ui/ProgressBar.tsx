// components/common/ProgressBar.tsx
import * as React from "react";
import { cn } from "../utils/cn";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number;
  label?: string;
  barColorClass?: string; 
  backgroundColorClass?: string; 
}

export const ProgressBar = ({
  percentage,
  label,
  barColorClass = "bg-primary-dark",
  backgroundColorClass = "bg-gray-200",
  className,
  ...props
}: ProgressBarProps) => {
  const progressWidth = Math.max(0, Math.min(100, percentage)); 

  return (
    <div className={cn("w-full", className)} {...props}>
      {label && <p className="text-sm text-text-secondary mb-1">{label}</p>}
      <div className={cn("h-2 rounded-full", backgroundColorClass)}>
        <div
          className={cn("h-full rounded-full transition-all duration-300 ease-out", barColorClass)}
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <p className="text-sm text-text-main font-medium mt-1 text-right">
        {progressWidth.toFixed(0)}%
      </p>
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";


