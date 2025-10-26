import React from 'react';
import { isStandardizedTag, getTagColors } from '../../config/tagColors';

/**
 * Tag Component
 *
 * A simple, plain text tag component with minimal styling.
 * Tags appear as text links with pipe separators, no button-like appearance.
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

  // No inline styles - let CSS handle all appearance
  const tagStyle = {};

  // Use text as-is, no formatting
  const displayText = tagText;

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
