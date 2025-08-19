import { useState, useEffect } from "react";

// Hook to detect mobile devices and screen sizes
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      // Mobile breakpoint: 768px and below
      const mobile = width <= 768;
      setIsMobile(mobile);
    };

    // Check on mount
    checkMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    isMobile,
    screenWidth,
    isTablet: screenWidth > 768 && screenWidth <= 1024,
    isDesktop: screenWidth > 1024,
  };
}

// Hook to detect if user prefers reduced motion
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
