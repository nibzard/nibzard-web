// ABOUTME: Semantic question matching utility for finding articles that answer similar questions
// ABOUTME: Uses keyword overlap and Jaccard similarity for matching question domains

/**
 * Common stop words to filter out when comparing questions
 */
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'you', 'your', 'do', 'does', 'what',
  'when', 'where', 'which', 'who', 'why', 'how', 'can', 'should'
]);

/**
 * Extract meaningful keywords from a question
 * @param {string} question - Question text
 * @returns {Set<string>} - Set of meaningful keywords
 */
function extractKeywords(question) {
  return new Set(
    question
      .toLowerCase()
      .replace(/[?.,!;:]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 3 && !STOP_WORDS.has(word))
  );
}

/**
 * Calculate similarity between two sets of questions using keyword overlap
 * @param {string[]} questionsA - Questions from first article
 * @param {string[]} questionsB - Questions from second article
 * @returns {number} - Similarity score (0-1)
 */
export function calculateQuestionSimilarity(questionsA, questionsB) {
  if (!questionsA?.length || !questionsB?.length) return 0;

  // Extract all keywords from both question sets
  const keywordsA = new Set();
  const keywordsB = new Set();

  questionsA.forEach(q => {
    extractKeywords(q).forEach(kw => keywordsA.add(kw));
  });

  questionsB.forEach(q => {
    extractKeywords(q).forEach(kw => keywordsB.add(kw));
  });

  // Calculate Jaccard similarity: intersection / union
  const intersection = [...keywordsA].filter(kw => keywordsB.has(kw));
  const union = new Set([...keywordsA, ...keywordsB]);

  return intersection.length / union.size;
}

/**
 * Find articles with similar questions to the current article
 * @param {string[]} currentQuestions - Questions from current article
 * @param {Array} allEntries - All available articles
 * @param {number} limit - Maximum number of articles to return
 * @returns {Array} - Sorted array of articles with similar questions
 */
export function findArticlesByQuestionSimilarity(currentQuestions, allEntries, limit = 3) {
  if (!currentQuestions?.length || !allEntries?.length) return [];

  // Score all articles that have answers_questions
  const scoredArticles = allEntries
    .filter(entry => entry.data?.answers_questions?.length > 0)
    .map(entry => ({
      entry,
      score: calculateQuestionSimilarity(
        currentQuestions,
        entry.data.answers_questions
      )
    }))
    .filter(item => item.score > 0); // Only include articles with some similarity

  // Sort by score (highest first) and take top N
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.entry);
}

/**
 * Extract topic domain from questions (e.g., "AI agents", "developer tools", "startup strategy")
 * @param {string[]} questions - Array of questions
 * @returns {string[]} - Identified topic domains
 */
export function extractTopicDomains(questions) {
  if (!questions?.length) return [];

  const domains = [];
  const keywords = new Set();

  questions.forEach(q => {
    extractKeywords(q).forEach(kw => keywords.add(kw));
  });

  // Simple domain identification based on common keywords
  if (keywords.has('agent') || keywords.has('agents')) domains.push('AI Agents');
  if (keywords.has('startup') || keywords.has('startups')) domains.push('Startups');
  if (keywords.has('developer') || keywords.has('developers')) domains.push('Developer Tools');
  if (keywords.has('marketing') || keywords.has('growth')) domains.push('Marketing & Growth');
  if (keywords.has('trust') || keywords.has('adoption')) domains.push('Trust & Adoption');
  if (keywords.has('pricing') || keywords.has('revenue')) domains.push('Pricing & Revenue');

  return domains;
}
