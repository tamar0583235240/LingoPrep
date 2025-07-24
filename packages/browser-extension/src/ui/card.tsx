import { cn } from "../utils/cn";
import * as React from "react";

export const CardSimple=({ className, children }: React.HTMLAttributes<HTMLDivElement>)=> {
  return (
    <div className={cn("bg-red rounded-lg shadow-sm border border-[--color-border] p-4", className)}>
      {children}
    </div>
  );
}




export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  category?: string;
  description: string;
  actionLabel?: string;
}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, category, description, actionLabel = "הורדה", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-gray-200 bg-white shadow-md p-6 flex flex-col justify-between min-h-[240px] max-w-sm w-full",
          className
        )}
        {...props}
      >
  
        <button className="mt-auto w-full bg-primary-dark hover:bg-primary-dark text-white py-2.5 rounded-xl text-sm font-semibold transition">
          {actionLabel}
        </button>
      </div>
    );
  }
);
Card.displayName = "Card";

