/**
 * Tag Utilities
 *
 * Helper functions for working with tags in the application.
 */

import { isStandardizedTag, getTagColors } from '../config/tagColors';

/**
 * Formats a tag for display
 * Standardized tags are displayed in uppercase, while custom tags
 * are displayed with their original casing.
 *
 * @param {string} tag - The tag to format
 * @returns {string} - The formatted tag
 */
export function formatTagForDisplay(tag) {
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
export function sortTags(tags) {
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

/**
 * Gets all standardized tags from a list of tags
 *
 * @param {string[]} tags - Array of tags
 * @returns {string[]} - Array of standardized tags
 */
export function getStandardizedTags(tags) {
  if (!tags || !Array.isArray(tags)) return [];
  return tags.filter(tag => {
    if (!tag) return false;
    return isStandardizedTag(String(tag).toUpperCase());
  });
}

/**
 * Gets all custom (non-standardized) tags from a list of tags
 *
 * @param {string[]} tags - Array of tags
 * @returns {string[]} - Array of custom tags
 */
export function getCustomTags(tags) {
  if (!tags || !Array.isArray(tags)) return [];
  return tags.filter(tag => {
    if (!tag) return false;
    return !isStandardizedTag(String(tag).toUpperCase());
  });
}
