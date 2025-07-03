import { useEffect, useRef } from "react";
import { loaderAnimations } from "../utils/animations";

export const useLoaderAnimations = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    let animation: gsap.core.Timeline;

    const pulse = loader.querySelector(".pulse") as HTMLElement;
    if (pulse) {
      animation = loaderAnimations.pulse(pulse);
    }

    return () => {
      if (animation) animation.kill();
    };
  }, []);

  return {
    loaderRef,
  };
};
