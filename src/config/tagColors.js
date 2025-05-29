/**
 * Tag Colors Configuration
 *
 * This file contains the configuration for standardized tags and their colors.
 * Each tag has a specific pastel but vivid color associated with it.
 *
 * Format:
 * {
 *   tagName: {
 *     backgroundColor: 'CSS color value',
 *     textColor: 'CSS color value',
 *     borderColor: 'CSS color value'
 *   }
 * }
 *
 * All tag names should be uppercase for consistency.
 */

const tagColors = {
  // Learning/Knowledge tags
  'TIL': {
    backgroundColor: '#E0F7FA', // Light cyan
    textColor: '#00838F',       // Dark cyan
    borderColor: '#26C6DA'      // Cyan
  },

  // Content type tags
  'ROBOPRESS': {
    backgroundColor: '#F3E5F5', // Light purple
    textColor: '#6A1B9A',       // Dark purple
    borderColor: '#AB47BC'      // Purple
  },
  'CHEATSHEET': {
    backgroundColor: '#E8F5E9', // Light green
    textColor: '#2E7D32',       // Dark green
    borderColor: '#66BB6A'      // Green
  },
  'OPINION': {
    backgroundColor: '#FFF3E0', // Light orange
    textColor: '#E65100',       // Dark orange
    borderColor: '#FF9800'      // Orange
  },

  // Status tags
  'NOW': {
    backgroundColor: '#FFEBEE', // Light red
    textColor: '#C62828',       // Dark red
    borderColor: '#EF5350'      // Red
  },
  'WIP': {
    backgroundColor: '#FFF8E1', // Light amber
    textColor: '#FF8F00',       // Dark amber
    borderColor: '#FFC107'      // Amber
  },
  'DONE': {
    backgroundColor: '#E0F2F1', // Light teal
    textColor: '#004D40',       // Dark teal
    borderColor: '#26A69A'      // Teal
  },

  // Technology tags
  'REACT': {
    backgroundColor: '#E1F5FE', // Light blue
    textColor: '#0277BD',       // Dark blue
    borderColor: '#29B6F6'      // Blue
  },
  'EXPERIENCE': {
    backgroundColor: '#F9FBE7', // Light lime
    textColor: '#827717',       // Dark lime
    borderColor: '#C0CA33'      // Lime
  },
  'AI': {
    backgroundColor: '#FFFDE7', // Light yellow
    textColor: '#F57F17',       // Dark yellow
    borderColor: '#FFEB3B'      // Yellow
  },

  // Add more standardized tags as needed
};

export default tagColors;

// Helper function to check if a tag is standardized
export function isStandardizedTag(tag) {
  if (!tag) return false;

  // Ensure we're working with a string
  const tagStr = String(tag).toUpperCase();

  // Direct lookup in the tagColors object
  return tagStr in tagColors;
}

// Helper function to get tag colors
export function getTagColors(tag) {
  if (!tag) return null;

  // Ensure we're working with a string
  const tagStr = String(tag).toUpperCase();

  // Direct lookup in the tagColors object
  return tagColors[tagStr];
}
