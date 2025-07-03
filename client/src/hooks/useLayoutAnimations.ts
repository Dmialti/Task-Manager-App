import { useEffect, useRef } from "react";
import { layoutAnimations } from "../utils/animations";

export const useLayoutAnimations = () => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layout = layoutRef.current;
    const sidebarEl = sidebarRef.current;
    const main = mainRef.current;

    if (layout) {
      layoutAnimations.mount(layout, sidebarEl || undefined, main || undefined);
    }
  }, []);

  return {
    layoutRef,
    sidebarRef,
    mainRef,
  };
};
