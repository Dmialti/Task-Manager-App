import { useEffect, useRef } from "react";
import { modalAnimations } from "../utils/animations";

export const useModalAnimations = (isOpen: boolean) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const modal = modalRef.current;

    if (!overlay || !modal) return;

    if (isOpen) {
      modalAnimations.show(overlay, modal);
    } else {
      modalAnimations.hide(overlay, modal);
    }
  }, [isOpen]);

  return { overlayRef, modalRef };
};
