import React from "react";
import { cn } from "./cn";

interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  noHeaderBorder?: boolean; // פרופס חדש לשליטה על הקו התחתון בכותרת
}

export const CardWrapper = ({
  title,
  icon,
  children,
  className,
  noHeaderBorder = false,
  ...props
}: CardWrapperProps) => {
  return (
    <section
      className={cn(
        "rounded-xl shadow-md p-6 space-y-4 border border-[--color-border]",
        className
      )}
      {...props}
    >
      <header
        className={cn(
          "flex items-center gap-3 pb-3 mb-4",
          !noHeaderBorder && "border-b border-[--color-border]"
        )}
      >
        {icon && <div className="text-[--color-primary-dark]">{icon}</div>}
        <h2 className="text-xl font-semibold text-[--color-text]">{title}</h2>
      </header>
      {children}
    </section>
  );
};




