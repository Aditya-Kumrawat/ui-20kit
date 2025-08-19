import { MotionProps } from "framer-motion";

// Check if device prefers reduced motion
export const getPrefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Check if device is mobile
export const getIsMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768;
};

// Get optimized animation props based on device capabilities
export const getOptimizedAnimationProps = (
  baseProps: MotionProps,
  isMobile?: boolean,
  prefersReducedMotion?: boolean
): MotionProps => {
  const mobile = isMobile ?? getIsMobileDevice();
  const reducedMotion = prefersReducedMotion ?? getPrefersReducedMotion();

  // If user prefers reduced motion, disable animations
  if (reducedMotion) {
    return {
      initial: false,
      animate: false,
      exit: false,
      transition: { duration: 0 },
    };
  }

  // Mobile-optimized animations (simpler, faster)
  if (mobile) {
    return {
      ...baseProps,
      transition: {
        ...baseProps.transition,
        duration: Math.min((baseProps.transition as any)?.duration || 0.3, 0.3),
        ease: "easeOut",
        // Disable complex spring animations on mobile
        type: "tween",
      },
      // Reduce complexity for mobile
      whileHover: undefined, // Disable hover animations on mobile
      whileTap: {
        scale: 0.98,
        transition: { duration: 0.1 }
      },
    };
  }

  // Desktop: full animations
  return baseProps;
};

// Pre-defined animation variants optimized for performance
export const animationVariants = {
  // Fade in/out
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  },

  // Slide up
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: "easeOut" }
  },

  // Slide from left
  slideLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  // Slide from right
  slideRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Mobile-optimized variants (faster, simpler)
export const mobileAnimationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.25, ease: "easeOut" }
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  slideLeft: {
    initial: { opacity: 0, x: -15 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 15 },
    transition: { duration: 0.25, ease: "easeOut" }
  },

  slideRight: {
    initial: { opacity: 0, x: 15 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -15 },
    transition: { duration: 0.25, ease: "easeOut" }
  }
};

// Get animation variant based on device
export const getAnimationVariant = (
  variantName: keyof typeof animationVariants,
  isMobile?: boolean,
  prefersReducedMotion?: boolean
) => {
  const mobile = isMobile ?? getIsMobileDevice();
  const reducedMotion = prefersReducedMotion ?? getPrefersReducedMotion();

  if (reducedMotion) {
    return {
      initial: false,
      animate: false,
      exit: false,
      transition: { duration: 0 }
    };
  }

  return mobile 
    ? mobileAnimationVariants[variantName] 
    : animationVariants[variantName];
};

// Performance monitoring for animations
export const logAnimationPerformance = (animationName: string, startTime: number) => {
  if (typeof window !== "undefined" && window.performance) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Log slow animations (> 16ms per frame for 60fps)
    if (duration > 16) {
      console.warn(`Slow animation detected: ${animationName} took ${duration.toFixed(2)}ms`);
    }
  }
};

// Debounce utility for reducing animation frequency
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for limiting animation frequency
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
