import { gsap } from "gsap";

export const buttonAnimations = {
  hover: {
    enter: (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
    },
    leave: (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    },
  },

  press: {
    down: (element: HTMLElement) => {
      gsap.to(element, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out",
      });
    },
    up: (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1,
        duration: 0.15,
        ease: "power2.out",
      });
    },
  },

  ripple: (element: HTMLElement, event: MouseEvent, button: HTMLElement) => {
    gsap.killTweensOf(element);

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    gsap.set(element, {
      width: size,
      height: size,
      left: x,
      top: y,
      scale: 0,
      opacity: 0.6,
    });

    gsap.to(element, {
      scale: 1,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  },
};

export const cardAnimations = {
  hover: {
    enter: (element: HTMLElement) => {
      gsap.to(element, {
        y: -4,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    leave: (element: HTMLElement) => {
      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  },
};

export const modalAnimations = {
  show: (overlay: HTMLElement, modal: HTMLElement) => {
    gsap.set(overlay, { display: "flex" });
    gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      modal,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
    );
  },

  hide: (overlay: HTMLElement, modal: HTMLElement) => {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
      },
    });
    gsap.to(modal, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.2,
      ease: "power2.in",
    });
  },
};

export const inputAnimations = {
  label: {
    float: (element: HTMLElement, variant: string) => {
      if (variant === "default" || variant === "filled") {
        gsap.to(element, {
          scale: 0.85,
          y: -24,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    },
    unfloat: (element: HTMLElement, variant: string) => {
      if (variant === "default" || variant === "filled") {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    },
  },

  underline: {
    focus: (element: HTMLElement) => {
      gsap.to(element, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    blur: (element: HTMLElement) => {
      gsap.to(element, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  },
};

export const layoutAnimations = {
  mount: (layout: HTMLElement, sidebar?: HTMLElement, main?: HTMLElement) => {
    gsap.fromTo(
      layout,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    if (sidebar) {
      gsap.fromTo(
        sidebar,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    }

    if (main) {
      gsap.fromTo(
        main,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }
  },
};

export const toastAnimations = {
  show: (element: HTMLElement, position: string) => {
    gsap.fromTo(
      element,
      {
        x: position.includes("right")
          ? 400
          : position.includes("left")
          ? -400
          : 0,
        y: position.includes("top")
          ? -100
          : position.includes("bottom")
          ? 100
          : 0,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      }
    );
  },

  hide: (element: HTMLElement, position: string) => {
    gsap.to(element, {
      x: position.includes("right")
        ? 400
        : position.includes("left")
        ? -400
        : 0,
      y: position.includes("top")
        ? -100
        : position.includes("bottom")
        ? 100
        : 0,
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
    });
  },

  progress: (
    element: HTMLElement,
    duration: number,
    onComplete: () => void
  ) => {
    gsap.fromTo(
      element,
      { width: "100%" },
      {
        width: "0%",
        duration: duration / 1000,
        ease: "none",
        onComplete,
      }
    );
  },
};

export const dropdownAnimations = {
  show: (element: HTMLElement) => {
    gsap.set(element, { display: "block", opacity: 0, y: -10 });
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  },

  hide: (element: HTMLElement) => {
    gsap.to(element, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(element, { display: "none" });
      },
    });
  },
};

// Loader Animations
export const loaderAnimations = {
  pulse: (element: HTMLElement) => {
    return gsap.timeline({ repeat: -1 }).to(element, {
      scale: 1.2,
      opacity: 0.6,
      duration: 1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    });
  },
};
