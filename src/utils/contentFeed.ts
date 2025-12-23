/**
 * Content Feed Utilities
 * Handles fetching, sorting, and interleaving content collections for the homepage feed
 */

import type { CollectionEntry } from 'astro:content';

export type ContentType = 'log' | 'thought' | 'now' | 'image' | 'idea';

export interface FeedEntry {
  type: ContentType;
  entry: CollectionEntry<'log' | 'thought' | 'now' | 'image' | 'idea'>;
}

/**
 * Safely gets the timestamp value from a Date, returning 0 if null
 */
export function getDateValue(date: Date | null): number {
  return date ? date.valueOf() : 0;
}

/**
 * Creates an interleaved feed from multiple content collections, sorted by date
 * Ensures the first entry is always a log entry if available
 */
export function createInterleavedFeed(
  logEntries: CollectionEntry<'log'>[],
  thoughts: CollectionEntry<'thought'>[],
  nowEntries: CollectionEntry<'now'>[],
  imageEntries: CollectionEntry<'image'>[],
  ideaEntries: CollectionEntry<'idea'>[]
): FeedEntry[] {
  const allFeedEntries: FeedEntry[] = [];
  const totalEntries =
    logEntries.length +
    thoughts.length +
    nowEntries.length +
    imageEntries.length +
    ideaEntries.length;

  // Use index variables to track position in each array
  let logIndex = 0;
  let thoughtIndex = 0;
  let nowIndex = 0;
  let imageIndex = 0;
  let ideaIndex = 0;

  // Ensure first entry is a log entry if available
  if (logIndex < logEntries.length) {
    allFeedEntries.push({ type: 'log', entry: logEntries[logIndex] });
    logIndex++;
  }

  // Add entries to feed in date order
  while (allFeedEntries.length < totalEntries) {
    const nextLogDate = logIndex < logEntries.length
      ? (logEntries[logIndex].data.updated || logEntries[logIndex].data.date)
      : null;
    const nextThoughtDate = thoughtIndex < thoughts.length
      ? thoughts[thoughtIndex].data.date
      : null;
    const nextNowDate = nowIndex < nowEntries.length
      ? nowEntries[nowIndex].data.date
      : null;
    const nextImageDate = imageIndex < imageEntries.length
      ? imageEntries[imageIndex].data.date
      : null;
    const nextIdeaDate = ideaIndex < ideaEntries.length
      ? ideaEntries[ideaIndex].data.date
      : null;

    // Find the most recent date among available entries
    let mostRecentType: ContentType | null = null;
    let mostRecentValue = 0;

    const logDateValue = getDateValue(nextLogDate);
    if (logDateValue > mostRecentValue) {
      mostRecentType = 'log';
      mostRecentValue = logDateValue;
    }

    const thoughtDateValue = getDateValue(nextThoughtDate);
    if (thoughtDateValue > mostRecentValue) {
      mostRecentType = 'thought';
      mostRecentValue = thoughtDateValue;
    }

    const nowDateValue = getDateValue(nextNowDate);
    if (nowDateValue > mostRecentValue) {
      mostRecentType = 'now';
      mostRecentValue = nowDateValue;
    }

    const imageDateValue = getDateValue(nextImageDate);
    if (imageDateValue > mostRecentValue) {
      mostRecentType = 'image';
      mostRecentValue = imageDateValue;
    }

    const ideaDateValue = getDateValue(nextIdeaDate);
    if (ideaDateValue > mostRecentValue) {
      mostRecentType = 'idea';
      mostRecentValue = ideaDateValue;
    }

    // Add the most recent entry to the feed
    if (mostRecentType === 'log') {
      allFeedEntries.push({ type: 'log', entry: logEntries[logIndex] });
      logIndex++;
    } else if (mostRecentType === 'thought') {
      allFeedEntries.push({ type: 'thought', entry: thoughts[thoughtIndex] });
      thoughtIndex++;
    } else if (mostRecentType === 'now') {
      allFeedEntries.push({ type: 'now', entry: nowEntries[nowIndex] });
      nowIndex++;
    } else if (mostRecentType === 'image') {
      allFeedEntries.push({ type: 'image', entry: imageEntries[imageIndex] });
      imageIndex++;
    } else if (mostRecentType === 'idea') {
      allFeedEntries.push({ type: 'idea', entry: ideaEntries[ideaIndex] });
      ideaIndex++;
    } else {
      // No more entries
      break;
    }
  }

  return allFeedEntries;
}

/**
 * Paginates a feed array
 */
export function paginateFeed(
  feedEntries: FeedEntry[],
  currentPage: number,
  pageSize: number
): {
  paginatedEntries: FeedEntry[];
  totalPages: number;
} {
  const totalPages = Math.ceil(feedEntries.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedEntries = feedEntries.slice(startIndex, endIndex);

  return { paginatedEntries, totalPages };
}
