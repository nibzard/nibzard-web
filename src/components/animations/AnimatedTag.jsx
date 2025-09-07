import React from 'react';
import { isStandardizedTag, getTagColors } from '../../config/tagColors';

/**
 * Tag Component
 *
 * A simple, performant tag component with CSS-only hover effects.
 * Supports both standardized (colored) and regular (subtle) tags.
 *
 * @param {Object} props - Component props
 * @param {string} props.href - The link destination for the tag
 * @param {string} [props.children] - The tag text content (optional if tagText is provided)
 * @param {string} [props.tagText] - The tag text content (alternative to children)
 * @param {boolean} [props.isActive=false] - Whether the tag is active (currently selected)
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @returns {JSX.Element} - The tag component
 */
export default function AnimatedTag({ href, children, tagText: propTagText, isActive = false, className = '', ...props }) {

  // Get tag text from props or children
  const tagText = propTagText || (typeof children === 'string' ? children : '');
  
  if (!tagText) {
    return <a href={href} className={`tag ${className}`} {...props}>{children || ''}</a>;
  }

  // Check if tag is standardized
  const isStandard = isStandardizedTag(tagText.toUpperCase());
  const tagColorConfig = isStandard ? getTagColors(tagText.toUpperCase()) : null;

  // Build CSS classes
  let tagClasses = `tag ${className}`;
  if (isStandard) {
    tagClasses += ' tag-standardized';
  }
  if (isActive) {
    tagClasses += ' active';
  }

  // Apply colors via inline styles for standardized tags
  const tagStyle = isStandard && tagColorConfig ? {
    backgroundColor: tagColorConfig.backgroundColor,
    borderColor: tagColorConfig.borderColor,
    color: tagColorConfig.textColor,
  } : {};

  // Format display text
  const displayText = isStandard ? tagText.toUpperCase() : tagText;

  return (
    <a
      href={href}
      className={tagClasses.trim()}
      style={tagStyle}
      {...props}
    >
      {displayText}
    </a>
  );
}
