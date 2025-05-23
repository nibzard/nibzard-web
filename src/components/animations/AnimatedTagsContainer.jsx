import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedTagsContainer Component
 *
 * A container for animated tags that provides staggered animations
 * for child tag elements.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child tag components
 * @param {string} props.className - Additional CSS classes to apply
 * @returns {JSX.Element} - The animated tags container component
 */
export default function AnimatedTagsContainer({ children, className = 'tags' }) {
  const [shouldShake, setShouldShake] = useState(false);

  // Trigger subtle shake animation occasionally
  useEffect(() => {
    // Initial delay before first shake
    const initialDelay = Math.random() * 5000 + 2000; // 2-7 seconds

    const initialTimer = setTimeout(() => {
      setShouldShake(true);

      // Reset shake after animation completes
      setTimeout(() => {
        setShouldShake(false);
      }, 1000);

      // Set up interval for occasional shakes
      const interval = setInterval(() => {
        setShouldShake(true);

        // Reset shake after animation completes
        setTimeout(() => {
          setShouldShake(false);
        }, 1000);
      }, Math.random() * 10000 + 15000); // 15-25 seconds

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, []);

  // Container animation for staggered children
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

  // Subtle shake animation
  const shakeAnimation = shouldShake ? {
    x: [0, -1, 2, -2, 1, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  } : {};

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={{
        ...shakeAnimation,
        opacity: 1
      }}
    >
      {children}
    </motion.div>
  );
}
