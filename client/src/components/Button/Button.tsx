import React from "react";
import { useButtonAnimations } from "../../hooks";
import { buttonStyles, cn } from "../../utils/styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const { buttonRef, rippleRef } = useButtonAnimations();

  return (
    <button
      ref={buttonRef}
      className={cn(
        buttonStyles.base,
        buttonStyles.variants[variant],
        buttonStyles.sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      <div
        ref={rippleRef}
        className={buttonStyles.ripple}
        style={{ transform: "scale(0)" }}
      />

      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      )}

      {!isLoading && leftIcon && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}

      {!isLoading && <span>{children}</span>}

      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
