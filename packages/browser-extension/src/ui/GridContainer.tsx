
import * as React from "react";
import { cn } from "../utils/cn";

interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "full" | "sm" | "md" | "lg" | "xl";

  gridClasses?: string;
  gap?: string;
  mt?: string;
  mb?: string;
  padding?: string;
}

export const GridContainer = React.forwardRef<HTMLDivElement, GridContainerProps>(
  (
    {
      className,
      children,
      maxWidth = "lg",
      gridClasses,
      gap = "gap-4",
      mt = "mt-8",
      mb = "mb-8",
      padding = "px-4 sm:px-6 lg:px-8",
      ...props
    },
    ref
  ) => {

    const maxWidthClasses = {
      full: "w-full",
      sm: "max-w-xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto",
          padding,
          mt,
          mb,
          maxWidthClasses[maxWidth],
          gridClasses && "grid",
          gridClasses,
          gap,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridContainer.displayName = "GridContainer";
