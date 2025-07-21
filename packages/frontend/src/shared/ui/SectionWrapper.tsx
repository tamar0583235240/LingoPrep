// components/profile/SectionWrapper.tsx
import * as React from "react";
import { cn } from "../utils/cn";
import { CardSimple } from "./card"; 
import { Heading1 } from "./typography"; 
import { Button } from "./button"; 
import { ToggleSwitch } from "./ToggleSwitch"; 
import { FaEdit } from "react-icons/fa"; 

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isPubliclyVisible: boolean;
  onToggleVisibility: () => void;
  onEditClick?: () => void; 
  children: React.ReactNode;
  showEditButton?: boolean; 
}

export const SectionWrapper = ({
  title,
  isPubliclyVisible,
  onToggleVisibility,
  onEditClick,
  children,
  showEditButton = true,
  className,
  ...props
}: SectionWrapperProps) => {
  return (
    <CardSimple className={cn("p-6 flex flex-col gap-6", className)} {...props}>
      <div className="flex justify-between items-center border-b border-[--color-border] pb-4 mb-4">
        <Heading1 className="!text-2xl !font-bold !m-0">{title}</Heading1>
        <div className="flex items-center gap-4">
          <ToggleSwitch
            checked={isPubliclyVisible}
            onToggle={onToggleVisibility}
            label={isPubliclyVisible ? "מוצג לציבור" : "פרטי"}
          />
          {showEditButton && onEditClick && (
            <Button variant="ghost" size="sm" onClick={onEditClick} aria-label={`ערוך ${title}`}>
              <FaEdit /> ערוך
            </Button>
          )}
        </div>
      </div>
      <div>
        {children}
      </div>
      {!isPubliclyVisible && (
          <p className="text-sm text-text-secondary text-right mt-4 italic">
            *המידע בסקשן זה מסומן כפרטי ולא יוצג בפרופיל הציבורי.
          </p>
      )}
    </CardSimple>
  );
};

SectionWrapper.displayName = "SectionWrapper";