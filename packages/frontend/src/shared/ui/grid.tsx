import * as React from "react";
import { cn } from "../utils/cn";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4;
}
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, children, ...props }, ref) => {
    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
    };
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          colClasses[cols],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";