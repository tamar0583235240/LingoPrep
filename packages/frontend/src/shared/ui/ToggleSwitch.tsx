import * as React from "react";
import { cn } from "../utils/cn";

interface ToggleSwitchProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}
export const ToggleSwitch = ({
  checked,
  onToggle,
  label,
  disabled = false,
  className,
}: ToggleSwitchProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {label && (
        <span className="text-sm font-medium text-text-main">{label}</span>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => {
          if (!disabled) onToggle();
        }}
        className={cn(
          "relative w-9 h-5 flex items-center rounded-full transition-colors duration-300",
          checked ? "bg-primary-dark" : "bg-border",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "absolute top-[2px] left-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-md transition-transform duration-300",
            checked ? "translate-x-[1rem]" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
};
