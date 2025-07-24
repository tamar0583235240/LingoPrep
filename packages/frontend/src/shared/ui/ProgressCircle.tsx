// components/common/ProgressCircle.tsx
import * as React from "react";
import { cn } from "../utils/cn";

interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string; 
}

export const ProgressCircle = ({
  percentage,
  size = 64,
  strokeWidth = 6,
  color = "primary-dark",
  className,
  ...props
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="transform -rotate-90">
      
        <circle
          className="text-gray-300"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`text-${color} transition-all duration-500 ease-out`}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-[0.75rem] text-text-secondary font-medium">
        {percentage.toFixed(0)}%
      </span>
    </div>
  );
};

ProgressCircle.displayName = "ProgressCircle";
