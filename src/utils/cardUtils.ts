/**
 * Card Utilities
 * Handles card width calculations, tag colors, and card-related logic
 */

import type { CollectionEntry } from 'astro:content';
import type { FeedEntry } from './contentFeed';

export interface TagColors {
  borderColor: string;
  backgroundColor: string;
  color: string;
}

export interface DoubleWidthResult {
  isDoubleWidth: boolean;
  borderStyle: string;
}

/**
 * Gets tag colors for a given tag name
 */
export function getTagColors(tag: string): TagColors | null {
  const colors: Record<string, TagColors> = {
    'AI': { borderColor: '#E45B5F', backgroundColor: '#FFF5F5', color: '#E45B5F' },
    'AGENTS': { borderColor: '#2D7A9C', backgroundColor: '#F0F9FF', color: '#2D7A9C' },
    'GROWTH': { borderColor: '#FFB865', backgroundColor: '#FFF9F0', color: '#D4951A' },
    'STARTUPS': { borderColor: '#4CAF50', backgroundColor: '#F1F8F4', color: '#2E7D32' },
    'DEVTOOLS': { borderColor: '#9C27B0', backgroundColor: '#F9F0FA', color: '#7B1FA2' },
    'RESEARCH': { borderColor: '#FF9800', backgroundColor: '#FFF8F0', color: '#E65100' },
    'REFLECTION': { borderColor: '#607D8B', backgroundColor: '#F5F7F8', color: '#455A64' },
    'YEAR-IN-REVIEW': { borderColor: '#E91E63', backgroundColor: '#FFF0F5', color: '#C2185B' },
    'META': { borderColor: '#3F51B5', backgroundColor: '#F0F2FF', color: '#303F9F' },
    'PRINCIPLES': { borderColor: '#00BCD4', backgroundColor: '#F0FDFF', color: '#0097A7' },
    'DESIGN': { borderColor: '#FF5722', backgroundColor: '#FFF5F0', color: '#E64A19' },
    'USER-EXPERIENCE': { borderColor: '#8BC34A', backgroundColor: '#F8FFF0', color: '#689F38' },
    'GROWTH-MINDSET': { borderColor: '#FFC107', backgroundColor: '#FFFDE7', color: '#FFA000' },
  };

  return colors[tag.toUpperCase()] || null;
}

/**
 * Calculates whether a log entry should be double width
 * First and last log entries on a page are double-width (if more than 1 log entry)
 */
export function calculateDoubleWidth(
  logEntrySlug: string,
  feedEntries: FeedEntry[]
): DoubleWidthResult {
  // Find all log entries in the current page
  const logEntriesInPage = feedEntries.filter((feedItem) => feedItem.type === 'log');

  // Find the index of the current log entry
  const currentLogIndex = logEntriesInPage.findIndex(
    (feedItem) => feedItem.entry.slug === logEntrySlug
  );

  const isFirstLogEntry = currentLogIndex === 0;
  const isLastLogEntry = currentLogIndex === logEntriesInPage.length - 1;
  const isDoubleWidth = (isFirstLogEntry || isLastLogEntry) && logEntriesInPage.length > 1;

  // Get tag colors for border styling
  const logEntry = logEntriesInPage[currentLogIndex]?.entry;
  const firstTag = 'tags' in logEntry?.data ? logEntry.data.tags?.[0] || null : null;
  const tagColor = firstTag ? getTagColors(firstTag) : null;
  const borderStyle = tagColor ? `border-left-color: ${tagColor.borderColor}` : '';

  return { isDoubleWidth, borderStyle };
}

/**
 * Gets entry metadata including date display
 */
export function getEntryMeta(
  entry: CollectionEntry<'log' | 'thought' | 'now' | 'image' | 'idea'>
): {
  date: Date;
  displayDate: string;
  isUpdated: boolean;
} {
  const isLogEntry = entry.collection === 'log';
  const date = isLogEntry && 'updated' in entry.data && entry.data.updated
    ? entry.data.updated
    : entry.data.date;

  return {
    date,
    displayDate: new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    isUpdated: isLogEntry && 'updated' in entry.data && !!entry.data.updated,
  };
}
