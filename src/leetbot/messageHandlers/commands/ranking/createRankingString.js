import stripDiscordTag from '../../../util/stripDiscordTag';
import createRankingIndexString from './createRankingIndexString';

const MAX = 10;

/**
 * @param {Array}  ranks Ranking array for the given message type.
 * @param {string} type  Message type
 * @param {Object} guild Discord guild object
 */
const createRankingString = (ranks, type, guild) => {
  const ranking = ranks.map((row, index) => {
    const rankString = createRankingIndexString(index);
    return `${rankString} ${stripDiscordTag(row.name)} (${row.counts[type]})`;
  });

  let rankingString = `${guild.name} ${type} ranking`;
  rankingString = `${rankingString}\n${ranking.slice(0, MAX).join('\n')}`;

  // Limit the number of users displayed
  if (ranking.length > MAX) {
    rankingString = `${rankingString}\n  ...and ${ranking.length - MAX} more users`;
  }

  // Add a link to the full stats
  rankingString = `${rankingString}\nView the full ranking at ${CLIENT_URL}/servers/${guild.id}`;

  return rankingString;
};

export default createRankingString;
