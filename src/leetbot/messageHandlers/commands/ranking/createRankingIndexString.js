/**
 * Creates the index part of a ranking string.
 * @param {number} index
 * @return {string}
 */
const createRankingIndexString = index => {
  // Give emoji medals to the top 3 ranks.
  if (index === 0) {
    return '🥇';
  }
  if (index === 1) {
    return '🥈';
  }
  if (index === 2) {
    return '🥉';
  }

  return `  ${index + 1}. `;
};

export default createRankingIndexString;
