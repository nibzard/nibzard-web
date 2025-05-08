import React from 'react';
// import { motion } from 'framer-motion'; // Uncomment if you use framer-motion

// Basic styles for navigation, can be moved to a CSS module
const navStyles = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  gap: 'var(--space-md)',
};

const linkStyles = {
  textDecoration: 'none',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-mono)',
};

export default function Navigation() {
  // Example navigation items
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/log", label: "Log" },
    { href: "/about", label: "About" },
    { href: "/now", label: "Now" },
    // Add more items as needed
  ];

  return (
    <nav>
      {/* <motion.ul style={navStyles} initial={{ opacity: 0 }} animate={{ opacity: 1 }}> */}
      <ul style={navStyles}>
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} style={linkStyles}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {/* </motion.ul> */}
    </nav>
  );
}