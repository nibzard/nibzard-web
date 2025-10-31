// ABOUTME: Smart article matching utility for finding related content based on tags, topics, and entities
// ABOUTME: Uses weighted scoring to recommend relevant articles to reduce bounce rate

/**
 * Calculate similarity score between two arrays of strings
 * @param {string[]} arrayA - First array
 * @param {string[]} arrayB - Second array
 * @returns {number} - Similarity score (0-1)
 */
function calculateArraySimilarity(arrayA, arrayB) {
  if (!arrayA?.length || !arrayB?.length) return 0;

  const setA = new Set(arrayA.map(item => item.toLowerCase()));
  const setB = new Set(arrayB.map(item => item.toLowerCase()));

  const intersection = [...setA].filter(item => setB.has(item));
  const union = new Set([...setA, ...setB]);

  // Jaccard similarity: intersection / union
  return intersection.length / union.size;
}

/**
 * Calculate tag similarity between two articles
 * @param {string[]} tagsA - Tags from first article
 * @param {string[]} tagsB - Tags from second article
 * @returns {number} - Similarity score (0-100)
 */
export function calculateTagSimilarity(tagsA, tagsB) {
  return calculateArraySimilarity(tagsA, tagsB) * 100;
}

/**
 * Calculate topic similarity between two articles
 * @param {string[]} topicsA - Topics from first article
 * @param {string[]} topicsB - Topics from second article
 * @returns {number} - Similarity score (0-100)
 */
export function calculateTopicSimilarity(topicsA, topicsB) {
  return calculateArraySimilarity(topicsA, topicsB) * 100;
}

/**
 * Calculate entity similarity between two articles
 * @param {string[]} entitiesA - Entities from first article
 * @param {string[]} entitiesB - Entities from second article
 * @returns {number} - Similarity score (0-100)
 */
export function calculateEntitySimilarity(entitiesA, entitiesB) {
  return calculateArraySimilarity(entitiesA, entitiesB) * 100;
}

/**
 * Calculate recency bonus for an article
 * @param {Date} articleDate - Publication date of the article
 * @returns {number} - Recency score (0-100)
 */
function calculateRecencyBonus(articleDate) {
  if (!articleDate) return 0;

  const now = new Date();
  const daysSincePublication = (now - new Date(articleDate)) / (1000 * 60 * 60 * 24);

  // Articles from last 30 days get full bonus, older articles get less
  if (daysSincePublication <= 30) return 100;
  if (daysSincePublication <= 90) return 75;
  if (daysSincePublication <= 180) return 50;
  if (daysSincePublication <= 365) return 25;
  return 10;
}

/**
 * Score an article's relevance to the current article
 * @param {Object} currentEntry - Current article data
 * @param {Object} otherEntry - Other article to score
 * @returns {number} - Composite relevance score (0-100)
 */
export function scoreArticle(currentEntry, otherEntry) {
  const tagScore = calculateTagSimilarity(
    currentEntry.tags || [],
    otherEntry.data?.tags || otherEntry.tags || []
  );

  const topicScore = calculateTopicSimilarity(
    currentEntry.topics || [],
    otherEntry.data?.topics || otherEntry.topics || []
  );

  const entityScore = calculateEntitySimilarity(
    currentEntry.entities || [],
    otherEntry.data?.entities || otherEntry.entities || []
  );

  const recencyScore = calculateRecencyBonus(
    otherEntry.data?.date || otherEntry.date
  );

  // Weighted composite score
  // 40% tags, 30% topics, 20% entities, 10% recency
  const compositeScore = (
    (tagScore * 0.40) +
    (topicScore * 0.30) +
    (entityScore * 0.20) +
    (recencyScore * 0.10)
  );

  return compositeScore;
}

/**
 * Get related articles sorted by relevance
 * @param {Object} currentEntry - Current article with tags, topics, entities
 * @param {Array} allEntries - All available articles
 * @param {number} limit - Maximum number of articles to return
 * @returns {Array} - Sorted array of related articles
 */
export function getRelatedArticles(currentEntry, allEntries, limit = 2) {
  if (!allEntries?.length) return [];

  // Filter out current article by title
  const otherEntries = allEntries.filter(
    entry => entry.data?.title !== currentEntry.title
  );

  // Score all articles
  const scoredArticles = otherEntries.map(entry => ({
    entry,
    score: scoreArticle(currentEntry, entry)
  }));

  // Sort by score (highest first) and take top N
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.entry);
}

/**
 * Get diverse related articles ensuring variety in recommendations
 * @param {Object} currentEntry - Current article
 * @param {Array} allEntries - All available articles
 * @param {number} limit - Maximum number of articles to return
 * @returns {Array} - Diverse array of related articles
 */
export function getDiverseRelatedArticles(currentEntry, allEntries, limit = 3) {
  const related = getRelatedArticles(currentEntry, allEntries, limit * 3);

  // Ensure diversity by avoiding multiple articles with exact same tags
  const diverse = [];
  const usedTagSets = new Set();

  for (const article of related) {
    const tagKey = (article.data?.tags || []).sort().join(',');

    if (!usedTagSets.has(tagKey) || diverse.length < limit) {
      diverse.push(article);
      usedTagSets.add(tagKey);
    }

    if (diverse.length >= limit) break;
  }

  return diverse;
}
