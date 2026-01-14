// ABOUTME: Scroll-triggered newsletter modal that appears at 60% scroll depth
// ABOUTME: Uses sessionStorage to remember dismissal, click-outside-to-close, ESC key support

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const STORAGE_KEY = 'nibzard_newsletter_modal_dismissed';

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      return;
    }

    // Track scroll depth
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollableHeight) * 100;

        // Trigger at 60% scroll
        if (progress >= 60 && !isOpen) {
          setIsOpen(true);
          // Prevent scrolling
          document.body.style.overflow = 'hidden';
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && isOpen) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // Call existing API endpoint
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).then(async (res) => {
      const result = await res.json();
      if (result.success) {
        handleClose();
      } else {
        console.error('Subscription failed:', result.error);
      }
    }).catch((err) => {
      console.error('Subscription error:', err);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="newsletter-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter subscription"
        >
          <motion.div
            className="newsletter-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
            onClick={handleContentClick}
          >
            <button
              className="newsletter-modal-close"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>

            <div className="newsletter-modal-body">
              <h3>Enjoying this article?</h3>
              <p>
                Get breakdowns of AI agent architecture, dev tool reviews,
                and go-to-market strategies delivered to your inbox.
              </p>

              <form className="newsletter-modal-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="newsletter-modal-input"
                />
                <button type="submit" className="newsletter-modal-button">
                  Subscribe
                </button>
              </form>

              <p className="newsletter-modal-legal">
                Unsubscribe anytime. No spam, ever.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
