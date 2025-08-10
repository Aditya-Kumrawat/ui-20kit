import React from "react";
import { motion, MotionProps } from "framer-motion";

// Safe wrapper for motion components to handle undefined animation values
export const SafeMotionDiv = React.forwardRef<HTMLDivElement, MotionProps>(
  (props, ref) => {
    // Filter out any undefined values from animation props
    const safeProps = { ...props };

    if (safeProps.animate && typeof safeProps.animate === "object") {
      const animate = safeProps.animate;
      Object.keys(animate).forEach((key) => {
        if (animate[key] === undefined) {
          delete animate[key];
        }
      });
    }

    return <motion.div ref={ref} {...safeProps} />;
  },
);

SafeMotionDiv.displayName = "SafeMotionDiv";

// Safe wrapper for motion.circle
export const SafeMotionCircle = React.forwardRef<
  SVGCircleElement,
  MotionProps & React.SVGProps<SVGCircleElement>
>((props, ref) => {
  const safeProps = { ...props };

  // Ensure required SVG attributes have defaults
  if (safeProps.cx === undefined) safeProps.cx = 0;
  if (safeProps.cy === undefined) safeProps.cy = 0;
  if (safeProps.r === undefined) safeProps.r = 1;

  if (safeProps.animate && typeof safeProps.animate === "object") {
    const animate = safeProps.animate;
    Object.keys(animate).forEach((key) => {
      if (animate[key] === undefined) {
        delete animate[key];
      }
    });
  }

  return <motion.circle ref={ref} {...safeProps} />;
});

SafeMotionCircle.displayName = "SafeMotionCircle";

// Safe wrapper for motion.rect
export const SafeMotionRect = React.forwardRef<
  SVGRectElement,
  MotionProps & React.SVGProps<SVGRectElement>
>((props, ref) => {
  const safeProps = { ...props };

  // Ensure required SVG attributes have defaults
  if (safeProps.x === undefined) safeProps.x = 0;
  if (safeProps.y === undefined) safeProps.y = 0;
  if (safeProps.width === undefined) safeProps.width = 1;
  if (safeProps.height === undefined) safeProps.height = 1;

  if (safeProps.animate && typeof safeProps.animate === "object") {
    const animate = safeProps.animate;
    Object.keys(animate).forEach((key) => {
      if (animate[key] === undefined) {
        delete animate[key];
      }
    });
  }

  return <motion.rect ref={ref} {...safeProps} />;
});

SafeMotionRect.displayName = "SafeMotionRect";
