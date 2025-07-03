import { useEffect, useRef } from "react";
import { cardAnimations } from "../utils/animations";

export const useCardAnimations = (hover: boolean) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hover || !cardRef.current) return;

    const card = cardRef.current;

    const handleMouseEnter = () => {
      cardAnimations.hover.enter(card);
    };

    const handleMouseLeave = () => {
      cardAnimations.hover.leave(card);
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hover]);

  return { cardRef };
};
