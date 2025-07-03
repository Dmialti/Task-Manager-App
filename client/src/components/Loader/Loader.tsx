import React from "react";
import { useLoaderAnimations } from "../../hooks/useLoaderAnimations";
import { loaderStyles, cn } from "../../utils/styles";

export interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "gray" | "green" | "red" | "purple";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "blue",
  text,
  fullScreen = false,
  className = "",
}) => {
  const { loaderRef } = useLoaderAnimations();

  const content = (
    <div ref={loaderRef} className={cn(loaderStyles.container, className)}>
      <div
        className={cn(
          "pulse",
          loaderStyles.sizes[size],
          loaderStyles.variants.pulse,
          loaderStyles.colors[color]
        )}
      />
      {text && (
        <p className={cn(loaderStyles.text, loaderStyles.colors[color])}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return <div className={loaderStyles.fullscreen}>{content}</div>;
  }

  return content;
};

export default Loader;
