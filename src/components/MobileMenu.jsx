// ABOUTME: Mobile hamburger menu component for better mobile navigation
// ABOUTME: Uses Framer Motion for smooth slide animations and handles mobile layout
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const handleSearchClick = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.searchOverlay) {
      window.searchOverlay.open();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { href: '/', label: '~/' },
    { href: '/log', label: 'log' },
    { href: '/about', label: 'about' },
    { href: '/projects', label: 'projects' },
    { href: '/now', label: 'now' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="mobile-menu-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        type="button"
      >
        <div className="hamburger-lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <h2>Menu</h2>
                <button
                  className="mobile-menu-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mobile-menu-nav">
                <ul>
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} onClick={() => setIsOpen(false)}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <button className="mobile-search-button" onClick={handleSearchClick}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                        <circle cx="11" cy="11" r="7" strokeWidth="2"/>
                        <line x1="16.5" y1="16.5" x2="21" y2="21" strokeWidth="2"/>
                      </svg>
                      Search
                    </button>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}