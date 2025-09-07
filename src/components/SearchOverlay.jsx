// ABOUTME: Full-screen search overlay component with mobile-first design
// ABOUTME: Uses Framer Motion for smooth animations and provides modern search experience
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Register this component with the global manager
  useEffect(() => {
    if (typeof window !== 'undefined' && window.searchOverlay) {
      window.searchOverlay.registerComponent({ 
        setState: (state) => {
          if (typeof state === 'object' && 'isOpen' in state) {
            setIsOpen(state.isOpen);
          } else {
            setIsOpen(state);
          }
        }
      });
    }
  }, []);

  const onClose = () => {
    if (typeof window !== 'undefined' && window.searchOverlay) {
      window.searchOverlay.close();
    }
  };

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle ESC key press and body scroll lock
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const body = document.body;
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when overlay is open - optimized approach
      body.classList.add('search-overlay-open');
    } else {
      body.classList.remove('search-overlay-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      body.classList.remove('search-overlay-open');
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <motion.div
            className="search-overlay-content"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
            onClick={(e) => e.stopPropagation()}
          >

            <form onSubmit={handleSubmit} className="search-overlay-form">
              <div className="search-overlay-input-container">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="search-overlay-input"
                  aria-label="Search query"
                />
                {query && (
                  <button
                    type="button"
                    className="search-overlay-clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button type="submit" className="search-overlay-button" disabled={!query.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                  <circle cx="11" cy="11" r="7" strokeWidth="2"/>
                  <line x1="16.5" y1="16.5" x2="21" y2="21" strokeWidth="2"/>
                </svg>
                Search
              </button>
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}