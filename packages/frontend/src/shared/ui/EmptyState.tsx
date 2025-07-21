// components/common/EmptyState.tsx
import * as React from "react";
import { cn } from "../utils/cn";
import { IconWrapper } from "./IconWrapper";
import { Heading1, Paragraph } from "./typography"; 
import { Button } from "./button"; 
import { FaPlusCircle } from "react-icons/fa";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  iconColor?: "primary-dark" | "secondary" | "accent" | "muted" | "success" | "danger";
}

export const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  iconColor = "muted", 
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center bg-muted/50 rounded-lg border border-[--color-border]",
        className
      )}
      {...props}
    >
      {icon && (
        <IconWrapper color={iconColor} size="lg" className="mb-4">
          {icon}
        </IconWrapper>
      )}
      <Heading1 className="!text-2xl !font-semibold mb-2">{title}</Heading1>
      {description && (
        <Paragraph className="max-w-md mb-6">{description}</Paragraph>
      )}
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick} variant="primary-dark">
          {buttonText}
        </Button>
      )}
    </div>
  );
};

EmptyState.displayName = "EmptyState";