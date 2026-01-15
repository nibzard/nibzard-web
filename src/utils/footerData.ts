// ABOUTME: Footer Data Utility
// ABOUTME: Fetches and organizes data for the SEO-oriented footer component

import { getCollection } from 'astro:content';

export interface FooterPost {
  slug: string;
  title: string;
  date: Date;
}

export interface FooterData {
  recentPosts: FooterPost[];
  featuredPosts: FooterPost[];
  popularTopics: string[];
}

/**
 * Gets the most frequently used tags across all log entries
 */
function getPopularTopics(allPosts: any[], limit: number = 8): string[] {
  const tagCounts = new Map<string, number>();

  // Count tag usage
  for (const post of allPosts) {
    const tags = post.data?.tags || [];
    for (const tag of tags) {
      const tagStr = String(tag).toLowerCase();
      tagCounts.set(tagStr, (tagCounts.get(tagStr) || 0) + 1);
    }
  }

  // Sort by count and return top N
  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

/**
 * Fetches all data needed for the footer component
 */
export async function getFooterData(
  recentCount: number = 5,
  featuredCount: number = 3,
  topicCount: number = 8
): Promise<FooterData> {
  // Get all published log entries
  const allPosts = await getCollection('log', ({ data, slug }) => {
    return data.draft !== true && slug !== 'claude' && data.title;
  });

  // Sort by date (newest first)
  allPosts.sort((a, b) => {
    const aDate = a.data.updated || a.data.date;
    const bDate = b.data.updated || b.data.date;
    return new Date(bDate).valueOf() - new Date(aDate).valueOf();
  });

  // Get recent posts
  const recentPosts: FooterPost[] = allPosts.slice(0, recentCount).map(post => ({
    slug: post.slug,
    title: post.data.title,
    date: new Date(post.data.updated || post.data.date)
  }));

  // Get featured posts
  const featuredPosts: FooterPost[] = allPosts
    .filter(post => post.data.featured === true)
    .slice(0, featuredCount)
    .map(post => ({
      slug: post.slug,
      title: post.data.title,
      date: new Date(post.data.updated || post.data.date)
    }));

  // Get popular topics
  const popularTopics = getPopularTopics(allPosts, topicCount);

  return {
    recentPosts,
    featuredPosts,
    popularTopics
  };
}
