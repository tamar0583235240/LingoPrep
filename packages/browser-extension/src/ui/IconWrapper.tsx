import * as React from "react";
import { cn } from "../utils/cn";

interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "primary-dark" | "secondary" | "accent" | "muted" | "success" | "danger";
  children: React.ReactNode;
}

export const IconWrapper = ({
  size = "md",
  color = "primary-dark",
  className,
  children,
  ...props
}: IconWrapperProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-lg",
    lg: "w-12 h-12 text-xl", 
  };

  const colorClasses = {
  "primary-dark": "bg-primary-dark text-white",
    secondary: "bg-secondary text-white",
    accent: "bg-accent text-white",
    muted: "bg-muted text-text-main",
    success: "bg-success text-white",
    danger: "bg-danger text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
