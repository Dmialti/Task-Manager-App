import { useState, useEffect, useRef } from "react";
import { inputAnimations } from "../utils/animations";

export const useInputAnimations = (
  variant: string,
  value?: string,
  defaultValue?: string
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value || !!defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    const labelEl = labelRef.current;
    const border = borderRef.current;

    if (!input || !labelEl) return;

    const handleFocus = () => {
      setIsFocused(true);
      inputAnimations.label.float(labelEl, variant);
      if (border && variant === "underlined") {
        inputAnimations.underline.focus(border);
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
      const inputValue = input.value;
      setHasValue(!!inputValue);

      if (!inputValue) {
        inputAnimations.label.unfloat(labelEl, variant);
      }
      if (border && variant === "underlined") {
        inputAnimations.underline.blur(border);
      }
    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, [variant]);

  return {
    inputRef,
    labelRef,
    borderRef,
    isFocused,
    hasValue,
  };
};
