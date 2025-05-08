import React from 'react';
import { motion } from 'framer-motion';

export default function FadeIn({ children, delay = 0, duration = 0.2, yOffset = 20 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Example ease, can be adjusted
      }}
    >
      {children}
    </motion.div>
  );
}