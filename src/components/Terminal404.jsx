import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Terminal404({ slug = '' }) {
  const safeSlug = typeof slug === 'string' ? slug.replace(/[^\w\-\/_]/g, '') : '';
  const lines = [
    `guest@nibzard:~$ cd /${safeSlug}`,
    `bash: cd: /${safeSlug}: No such file or directory`,
    `guest@nibzard:~$ curl -I https://nibzard.com/${safeSlug}`,
    `HTTP/1.1 404 Not Found`,
    `guest@nibzard:~$ hint: press '/' to search or try a random log`
  ];

  return (
    <div className="terminal404" role="group" aria-label="Terminal output simulation">
      <AnimatePresence>
        {lines.map((text, i) => (
          <motion.pre
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.3, ease: [0.0, 0.0, 0.2, 1] }}
            className="terminal404-line"
            aria-live={i === lines.length - 1 ? 'polite' : 'off'}
          >
            {text}
            {i === lines.length - 1 && <span className="cursor" aria-hidden>█</span>}
          </motion.pre>
        ))}
      </AnimatePresence>
      <style>{`
        .terminal404 {
          background: var(--color-subtle-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-lg);
          padding: var(--space-xl);
          font-family: var(--font-code);
          color: var(--color-text);
          overflow: hidden;
        }
        .terminal404-line {
          margin: 0 0 var(--space-sm) 0;
          white-space: pre-wrap;
          line-height: 1.45;
        }
        .terminal404-line:nth-child(2) {
          color: var(--color-accent1);
        }
        .cursor {
          display: inline-block;
          margin-left: 4px;
          opacity: 1;
          animation: blink 1.1s steps(1) infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
