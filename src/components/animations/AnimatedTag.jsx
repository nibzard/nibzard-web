import React from 'react';
import { motion } from 'framer-motion';
import { isStandardizedTag, getTagColors } from '../../config/tagColors';

/**
 * AnimatedTag Component
 *
 * A reusable animated tag component that adds subtle animations to tags
 * across the site. Uses Framer Motion for animations.
 *
 * @param {Object} props - Component props
 * @param {string} props.href - The link destination for the tag
 * @param {string} [props.children] - The tag text content (optional if tagText is provided)
 * @param {string} [props.tagText] - The tag text content (alternative to children)
 * @param {boolean} [props.isActive=false] - Whether the tag is active (currently selected)
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @returns {JSX.Element} - The animated tag component
 */
export default function AnimatedTag({ href, children, tagText: propTagText, isActive = false, className = '', ...props }) {

  // Use propTagText if provided, otherwise extract from children
  let tagText = propTagText || '';

  // If no propTagText but we have children, extract from children
  if (!tagText && children) {
    // Handle different types of children
    if (typeof children === 'string') {
      tagText = children;
    } else if (typeof children === 'object') {
      // Try to extract text from React element or object
      if (children.props && children.props.children) {
        tagText = children.props.children.toString();
      } else {
        // Last resort, try toString()
        try {
          tagText = children.toString();
        } catch (e) {
          console.error('Could not convert tag to string:', e);
        }
      }
    }
  }

  // Skip processing if no tag text
  if (!tagText) {
    return <a href={href} className={`tag ${className}`} {...props}>{children || ''}</a>;
  }

  // Clean up the tag text (remove any HTML or special characters)
  tagText = tagText.replace(/<[^>]*>?/gm, '').trim();

  // For standardization, use uppercase version to match config keys
  const standardCheckText = tagText.toUpperCase();
  const isStandard = isStandardizedTag(standardCheckText);
  const tagColorConfig = isStandard ? getTagColors(standardCheckText) : null;

  // Animation variants - simplified to avoid color conflicts
  const tagVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  // Subtle animation that plays on mount
  const initialAnimation = {
    scale: [0.95, 1.02, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  };

  // No pulsing animation as it causes tags to fade away

  // Classes to apply based on active state and standardized status
  const tagClasses = `tag ${isActive ? 'active' : ''} ${isStandard ? 'standardized-tag' : ''} ${className}`;

  // Create direct style object for standardized tags
  const tagStyle = isStandard && tagColorConfig ? {
    backgroundColor: tagColorConfig.backgroundColor,
    borderColor: tagColorConfig.borderColor,
    color: tagColorConfig.textColor,
    // Add a subtle shadow for active tags
    ...(isActive ? {
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
      fontWeight: 600
    } : {})
  } : {};

  // Create hover styles for standardized tags
  const hoverProps = isStandard && tagColorConfig ? {
    whileHover: {
      scale: 1.05,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      opacity: 0.9,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  } : {
    whileHover: "hover"
  };

  // Combine initial animation without colors (handled by style prop)
  const combinedAnimation = initialAnimation;

  // Use the tag text directly for display
  const displayText = tagText || (typeof children === 'string' ? children : '');

  return (
    <motion.a
      href={href}
      className={tagClasses}
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={combinedAnimation}
      {...hoverProps}
      whileTap="tap"
      variants={tagVariants}
      style={tagStyle}
      {...props}
    >
      {displayText}
    </motion.a>
  );
}
