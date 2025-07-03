import React from "react";
import { useInputAnimations } from "../../hooks";
import { inputStyles, cn } from "../../utils/styles";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "underlined";
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  leftIcon,
  rightIcon,
  size = "md",
  variant = "default",
  className = "",
  ...props
}) => {
  const { inputRef, labelRef, borderRef, isFocused, hasValue } =
    useInputAnimations(
      variant,
      props.value as string,
      props.defaultValue as string
    );

  const getLabelClasses = () => {
    if (variant === "underlined") {
      return cn(
        inputStyles.label.base,
        isFocused || hasValue
          ? inputStyles.label.underlined.floating
          : cn(inputStyles.label.normal, inputStyles.label.underlined.normal),
        isFocused && "text-blue-600"
      );
    }

    const isFloating = isFocused || hasValue;
    return cn(
      inputStyles.label.base,
      isFloating ? inputStyles.label.floating : inputStyles.label.normal,
      variant === "filled"
        ? isFloating
          ? "top-1"
          : "top-3"
        : isFloating
        ? "top-1"
        : "top-3"
    );
  };

  return (
    <div className="relative">
      <div
        className={
          leftIcon || rightIcon ? "relative flex items-center" : "relative"
        }
      >
        {leftIcon && (
          <div className={cn(inputStyles.icon, inputStyles.iconLeft)}>
            {leftIcon}
          </div>
        )}

        <input
          ref={inputRef}
          className={cn(
            inputStyles.base,
            inputStyles.variants[variant],
            inputStyles.sizes[size],
            leftIcon ? "pl-10" : undefined,
            rightIcon ? "pr-10" : undefined,
            error && inputStyles.states.error,
            success && inputStyles.states.success,
            className
          )}
          {...props}
        />

        {label && (
          <label
            ref={labelRef}
            className={getLabelClasses()}
            style={{
              left: leftIcon ? "2.5rem" : "1rem",
            }}
          >
            {label}
          </label>
        )}

        {rightIcon && (
          <div className={cn(inputStyles.icon, inputStyles.iconRight)}>
            {rightIcon}
          </div>
        )}

        {variant === "underlined" && (
          <div
            ref={borderRef}
            className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transform scale-x-0 origin-left"
            style={{ width: "100%" }}
          />
        )}
      </div>

      {error && <p className={inputStyles.message.error}>{error}</p>}

      {success && !error && (
        <p className={inputStyles.message.success}>{success}</p>
      )}
    </div>
  );
};

export default Input;
