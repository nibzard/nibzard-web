import { jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function AnimatedTagsContainer({ children, className = "tags" }) {
  const [shouldShake, setShouldShake] = useState(false);
  useEffect(() => {
    const initialDelay = Math.random() * 5e3 + 2e3;
    const initialTimer = setTimeout(() => {
      setShouldShake(true);
      setTimeout(() => {
        setShouldShake(false);
      }, 1e3);
      const interval = setInterval(() => {
        setShouldShake(true);
        setTimeout(() => {
          setShouldShake(false);
        }, 1e3);
      }, Math.random() * 1e4 + 15e3);
      return () => clearInterval(interval);
    }, initialDelay);
    return () => clearTimeout(initialTimer);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  const shakeAnimation = shouldShake ? {
    x: [0, -1, 2, -2, 1, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  } : {};
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className,
      variants: containerVariants,
      initial: "hidden",
      animate: {
        ...shakeAnimation,
        opacity: 1
      },
      children
    }
  );
}

export { AnimatedTagsContainer as A };
