import { useEffect, useRef } from "react";
import { buttonAnimations } from "../utils/animations";

export const useButtonAnimations = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      buttonAnimations.hover.enter(button);
    };

    const handleMouseLeave = () => {
      buttonAnimations.hover.leave(button);
    };

    const handleMouseDown = () => {
      buttonAnimations.press.down(button);
    };

    const handleMouseUp = () => {
      buttonAnimations.press.up(button);
    };

    const handleClick = (e: MouseEvent) => {
      buttonAnimations.press.up(button);
      if (rippleRef.current) {
        buttonAnimations.ripple(rippleRef.current, e, button);
      }
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousedown", handleMouseDown);
    button.addEventListener("mouseup", handleMouseUp);
    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousedown", handleMouseDown);
      button.removeEventListener("mouseup", handleMouseUp);
      button.removeEventListener("click", handleClick);
    };
  }, []);

  return { buttonRef, rippleRef };
};
