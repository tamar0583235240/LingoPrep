// SummaryBox.tsx
import * as React from "react";
import { cn } from "../utils/cn";
import { CardSimple } from "./card";
import { IconWrapper } from "./IconWrapper";

interface SummaryBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconColor?: "primary-dark" | "secondary" | "accent" | "muted" | "success" | "danger";
}

export const SummaryBox = ({
  title,
  value,
  description,
  icon,
  iconColor = "primary-dark",
  className,
  ...props
}: SummaryBoxProps) => {
  return (
    <CardSimple
      className={cn(
        "flex flex-col items-center px-6 py-5 rounded-xl text-center space-y-2 border border-border bg-white min-h-[200px]",
        className
      )}
      {...props}
    >
      {icon && (
        <IconWrapper color={iconColor} size="lg">
          {icon}
        </IconWrapper>
      )}
      <p className="text-sm text-text-secondary">{title}</p>
      <div className="text-[28px] font-bold text-text-main">{value}</div>
      {description && (
        <div className="text-sm text-text-secondary leading-snug">{description}</div>
      )}
    </CardSimple>
  );
};
