import React, { useEffect } from "react";
import { useModalAnimations } from "../../hooks";
import { modalStyles, cn } from "../../utils/styles";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  closeOnOverlayClick = true,
}) => {
  const { overlayRef, modalRef } = useModalAnimations(isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={modalStyles.overlay}
      style={{ display: "none" }}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={cn(modalStyles.container, modalStyles.sizes[size])}
      >
        {title && (
          <div className={modalStyles.header}>
            <h2 className={modalStyles.title}>{title}</h2>
            <button onClick={onClose} className={modalStyles.closeButton}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        <div className={modalStyles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
