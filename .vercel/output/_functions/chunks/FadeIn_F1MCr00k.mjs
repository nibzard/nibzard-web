import { jsx } from 'react/jsx-runtime';
import 'react';
import { motion } from 'framer-motion';

function FadeIn({ children, delay = 0, duration = 0.2, yOffset = 20 }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: yOffset },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
        // Example ease, can be adjusted
      },
      children
    }
  );
}

export { FadeIn as F };
