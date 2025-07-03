import React from "react";
import { useCardAnimations } from "../../hooks";
import { cardStyles, cn } from "../../utils/styles";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "white" | "gray" | "transparent";
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  padding = "md",
  shadow = "md",
  rounded = "lg",
  background = "white",
}) => {
  const { cardRef } = useCardAnimations(hover);

  return (
    <div
      ref={cardRef}
      className={cn(
        cardStyles.base,
        cardStyles.padding[padding],
        cardStyles.shadow[shadow],
        cardStyles.rounded[rounded],
        cardStyles.background[background],
        hover && cardStyles.hover,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
