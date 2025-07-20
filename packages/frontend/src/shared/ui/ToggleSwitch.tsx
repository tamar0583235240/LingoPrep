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
    <div className={cn("flex items-center gap-4", className)}>
      {label && (
        <label className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {checked ? "ציבורי" : "פרטי"}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => {
            if (!disabled) onToggle();
          }}
          style={{
            backgroundColor: checked
              ? "var(--color-primary)"
              : "var(--color-border)",
            transition: "background-color 0.3s",
          }}
          className={cn(
            "relative w-10 h-6 flex items-center rounded-full",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        >
          <span
            style={{
              right: checked ? 4 : "auto",
              left: checked ? "auto" : 4,
              transition: "right 0.3s, left 0.3s",
            }}
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
          />
        </button>
      </div>
    </div>
  );
};
