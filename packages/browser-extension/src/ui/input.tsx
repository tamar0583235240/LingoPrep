import * as React from "react";
import { cn } from "./cn";
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-[--color-border] px-3 py-2 text-sm focus:ring-[--color-primary] focus:border-[--color-primary]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";