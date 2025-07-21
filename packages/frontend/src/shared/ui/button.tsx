import * as React from "react";
import { cn } from "../utils/cn";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  variant?: "primary-dark" | "danger" | "outline" | "ghost" | "transparent";
  size?: "sm" | "md" | "lg" | "extra-wide";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary-dark",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      // "black": "bg-black text-white hover:bg-gray-800 focus:ring-black",
      "primary-dark": "bg-primary-dark text-white hover:bg-primary-dark/90 focus:ring-primary-dark",
      danger: "bg-danger text-white hover:bg-danger/90 focus:ring-danger",
      outline: "bg-white text-text-main border border-border hover:bg-muted focus:ring-gray-300",
      ghost: "bg-transparent text-text-main hover:bg-muted focus:ring-gray-300",
      transparent: "bg-transparent text-text-main hover:bg-gray-100 border border-transparent focus:ring-gray-300", // וריאנט שקוף
    };

    const sizeClasses = {
      sm: "px-4 py-1.5 text-sm",
      md: "px-6 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg",
      "extra-wide": "px-16 py-3 text-base",
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap",
          "transition-colors duration-200 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-opacity-50",
          "gap-2",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          isDisabled && "opacity-70 cursor-not-allowed",
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></span>
        ) : (
          icon && iconPosition === "left" && icon
        )}

        {isLoading ? "טוען..." : children}
        {!isLoading && icon && iconPosition === "right" && icon}
      </button>
    );
  }
)

Button.displayName = "Button";