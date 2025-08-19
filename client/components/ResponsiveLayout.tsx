import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { FloatingTopBar } from "@/components/FloatingTopBar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { useSidebar } from "@/contexts/SidebarContext";
import { useMobile, useReducedMotion } from "@/hooks/use-mobile";

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
  showTopBar?: boolean;
}

export const ResponsiveLayout = ({ 
  children, 
  className = "",
  showTopBar = true 
}: ResponsiveLayoutProps) => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { isMobile, isTablet } = useMobile();
  const prefersReducedMotion = useReducedMotion();

  // Animation settings that respect user preferences
  const motionSettings = prefersReducedMotion ? {
    initial: false,
    animate: false,
    transition: { duration: 0 }
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
      {/* Desktop/Tablet Sidebar */}
      {!isMobile && (
        <FloatingSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}

      {/* Desktop/Tablet Top Bar */}
      {!isMobile && showTopBar && (
        <FloatingTopBar isCollapsed={isCollapsed} />
      )}

      {/* Main Content */}
      <motion.div
        className={`transition-all duration-300 ${
          isMobile 
            ? "pb-24 px-4 pt-4" // Mobile: add bottom padding for nav, horizontal padding
            : isTablet
              ? "ml-20 pt-28 p-6" // Tablet: smaller margin, standard padding
              : isCollapsed 
                ? "ml-20 pt-28 p-6" // Desktop collapsed
                : "ml-72 pt-28 p-6" // Desktop expanded
        }`}
        {...motionSettings}
        style={{
          marginLeft: isMobile ? 0 : isTablet ? 80 : (isCollapsed ? 80 : 272),
          paddingTop: isMobile ? 16 : 112,
          minHeight: isMobile ? "calc(100vh - 96px)" : "calc(100vh - 112px)"
        }}
      >
        {children}
      </motion.div>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
};
