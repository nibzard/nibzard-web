import { jsx } from 'react/jsx-runtime';
import 'react';
import { motion } from 'framer-motion';
import { i as isStandardizedTag, g as getTagColors } from './tagColors_CMoIAJx5.mjs';

function AnimatedTag({ href, children, tagText: propTagText, isActive = false, className = "", ...props }) {
  let tagText = propTagText || "";
  if (!tagText && children) {
    if (typeof children === "string") {
      tagText = children;
    } else if (typeof children === "object") {
      if (children.props && children.props.children) {
        tagText = children.props.children.toString();
      } else {
        try {
          tagText = children.toString();
        } catch (e) {
          console.error("Could not convert tag to string:", e);
        }
      }
    }
  }
  if (!tagText) {
    return /* @__PURE__ */ jsx("a", { href, className: `tag ${className}`, ...props, children: children || "" });
  }
  tagText = tagText.replace(/<[^>]*>?/gm, "").trim();
  const standardCheckText = tagText.toUpperCase();
  const isStandard = isStandardizedTag(standardCheckText);
  const tagColorConfig = isStandard ? getTagColors(standardCheckText) : null;
  const tagVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };
  const initialAnimation = {
    scale: [0.95, 1.02, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  };
  const tagClasses = `tag ${isActive ? "active" : ""} ${isStandard ? "standardized-tag" : ""} ${className}`;
  const tagStyle = isStandard && tagColorConfig ? {
    backgroundColor: tagColorConfig.backgroundColor,
    borderColor: tagColorConfig.borderColor,
    color: tagColorConfig.textColor,
    // Add a subtle shadow for active tags
    ...isActive ? {
      boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
      fontWeight: 600
    } : {}
  } : {};
  const hoverProps = isStandard && tagColorConfig ? {
    whileHover: {
      scale: 1.05,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      opacity: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  } : {
    whileHover: "hover"
  };
  const combinedAnimation = initialAnimation;
  const displayText = tagText || (typeof children === "string" ? children : "");
  return /* @__PURE__ */ jsx(
    motion.a,
    {
      href,
      className: tagClasses,
      initial: {
        opacity: 0,
        scale: 0.95
      },
      animate: combinedAnimation,
      ...hoverProps,
      whileTap: "tap",
      variants: tagVariants,
      style: tagStyle,
      ...props,
      children: displayText
    }
  );
}

/**
 * Tag Utilities
 *
 * Helper functions for working with tags in the application.
 */


/**
 * Formats a tag for display
 * Standardized tags are displayed in uppercase, while custom tags
 * are displayed with their original casing.
 *
 * @param {string} tag - The tag to format
 * @returns {string} - The formatted tag
 */
function formatTagForDisplay(tag) {
  if (!tag) return '';

  // Ensure we're working with a string
  const tagStr = String(tag);

  // Check if it's a standardized tag (using uppercase for check)
  const isStandard = isStandardizedTag(tagStr.toUpperCase());

  return isStandard ? tagStr.toUpperCase() : tagStr;
}

/**
 * Sorts tags with standardized tags first, then alphabetically
 *
 * @param {string[]} tags - Array of tags to sort
 * @returns {string[]} - Sorted array of tags
 */
function sortTags(tags) {
  if (!tags || !Array.isArray(tags)) return [];

  return [...tags].sort((a, b) => {
    if (!a) return 1;  // Undefined values go to the end
    if (!b) return -1; // Undefined values go to the end

    // Ensure we're working with strings
    const aStr = String(a);
    const bStr = String(b);

    // Check if they're standardized (using uppercase for check)
    const aIsStandard = isStandardizedTag(aStr.toUpperCase());
    const bIsStandard = isStandardizedTag(bStr.toUpperCase());

    // If both are standardized or both are custom, sort alphabetically
    if (aIsStandard === bIsStandard) {
      return aStr.toLowerCase().localeCompare(bStr.toLowerCase());
    }

    // Standardized tags come first
    return aIsStandard ? -1 : 1;
  });
}

export { AnimatedTag as A, formatTagForDisplay as f, sortTags as s };
