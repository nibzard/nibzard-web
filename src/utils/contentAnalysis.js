/**
 * Content Analysis Utility
 *
 * Determines appropriate card sizes for masonry grid layout
 * based on content characteristics like title length, content type, etc.
 */

/**
 * Analyzes content and returns appropriate card size class
 * @param {Object} entry - The content entry (log, thought, now, etc.)
 * @param {string} entryType - Type of entry ('log', 'thought', 'now', 'image', 'idea')
 * @returns {string} - Card size class (card-sm, card-md, card-lg, card-xl, card-wide)
 */
export function getCardSize(entry, entryType) {
  const { data } = entry;

  // Base sizes for different content types
  switch (entryType) {
    case 'thought':
      return getThoughtCardSize(entry);

    case 'now':
      return getNowCardSize(entry);

    case 'image':
      return 'card-wide'; // Images work well as wide cards

    case 'idea':
      return getIdeaCardSize(entry);

    case 'log':
    default:
      return getLogCardSize(entry);
  }
}

/**
 * Determines card size for log entries
 */
function getLogCardSize(entry) {
  const { data } = entry;
  const title = data.title || '';
  const tldr = data.tldr || '';
  const description = data.description || '';

  // Title length analysis
  const titleLength = title.length;
  const hasLongTitle = titleLength > 50;
  const hasShortTitle = titleLength < 20;

  // Content analysis
  const hasTLDR = tldr && tldr.length > 0;
  const hasDescription = description && description.length > 0;
  const contentLength = (tldr || '').length + (description || '').length;

  // Heuristics for sizing
  if (hasLongTitle && hasTLDR) {
    return 'card-lg'; // Long title with summary needs more space
  }

  if (hasLongTitle || contentLength > 200) {
    return 'card-md'; // Medium content
  }

  if (hasShortTitle && !hasTLDR) {
    return 'card-sm'; // Short, simple content
  }

  // Check for special markers for featured content
  if (title.includes('★') || title.includes('⭐') || title.includes('FEATURED')) {
    return 'card-xl'; // Featured content gets large card
  }

  // Default size
  return 'card-md';
}

/**
 * Determines card size for thoughts
 */
function getThoughtCardSize(entry) {
  const { data } = entry;
  const content = data.content || '';
  const contentLength = content.length;

  if (contentLength < 100) {
    return 'card-sm'; // Short thoughts
  }

  if (contentLength > 300) {
    return 'card-lg'; // Long, detailed thoughts
  }

  return 'card-md'; // Standard thoughts
}

/**
 * Determines card size for now entries
 */
function getNowCardSize(entry) {
  const { data } = entry;
  const content = data.content || '';
  const contentLength = content.length;

  // Now entries are typically updates, keep them compact
  if (contentLength < 150) {
    return 'card-sm';
  }

  return 'card-md';
}

/**
 * Determines card size for ideas
 */
function getIdeaCardSize(entry) {
  const { data } = entry;
  const title = data.title || '';
  const description = data.description || '';

  const titleLength = title.length;
  const hasDescription = description && description.length > 0;

  if (titleLength > 40 || hasDescription) {
    return 'card-md';
  }

  return 'card-sm';
}

/**
 * Adds some randomness to make the layout more playful
 * while maintaining content-appropriate sizing
 */
export function addPlayfulVariation(baseSize, entryIndex) {
  // Use entry index to create deterministic "randomness"
  const randomFactor = (entryIndex * 7 + 13) % 10;

  // Occasionally make cards slightly bigger for visual interest
  if (randomFactor > 8 && baseSize === 'card-md') {
    return 'card-lg';
  }

  if (randomFactor < 2 && baseSize === 'card-lg') {
    return 'card-md';
  }

  return baseSize;
}

/**
 * Gets the final card size with playful variation
 */
export function getFinalCardSize(entry, entryType, entryIndex) {
  const baseSize = getCardSize(entry, entryType);
  return addPlayfulVariation(baseSize, entryIndex);
}