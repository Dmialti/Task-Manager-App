import React from "react";
import { useLayoutAnimations } from "../../hooks/useLayoutAnimations";
import { layoutStyles, cn } from "../../utils/styles";

export interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: "sm" | "md" | "lg";
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  sidebar,
  header,
  footer,
  sidebarWidth = "md",
  className = "",
}) => {
  const { layoutRef, sidebarRef, mainRef } = useLayoutAnimations();

  return (
    <div ref={layoutRef} className={cn(layoutStyles.container, className)}>
      {header && <header className={layoutStyles.header}>{header}</header>}

      <div className={layoutStyles.content}>
        {sidebar && (
          <aside
            ref={sidebarRef}
            className={cn(
              layoutStyles.sidebar.base,
              layoutStyles.sidebar.widths[sidebarWidth]
            )}
          >
            {sidebar}
          </aside>
        )}

        <main ref={mainRef} className={layoutStyles.main}>
          {children}
        </main>
      </div>

      {footer && <footer className={layoutStyles.footer}>{footer}</footer>}
    </div>
  );
};

export default Layout;
