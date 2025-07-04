import React from "react";

export interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked = false,
  onChange,
  disabled = false,
  label,
  className = "",
  size = "md",
  variant = "primary",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const variantClasses = {
    primary: "text-blue-600 focus:ring-blue-500",
    secondary: "text-gray-600 focus:ring-gray-500",
  };

  const checkboxClasses = `
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    rounded border-gray-300 
    focus:ring-2 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
    ${className}
  `.trim();

  if (label) {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={checkboxClasses}
        />
        <span
          className={`text-sm font-medium select-none ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {label}
        </span>
      </label>
    );
  }

  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      className={checkboxClasses}
    />
  );
};

export default Checkbox;
