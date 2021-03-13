import stripDiscordTag from '../../../util/stripDiscordTag';
import TimeUtils from '../../../util/TimeUtils';
import createRankingIndexString from './createRankingIndexString';

const MAX = 10;

/**
 * Creates a ranking string for the fastest and slowest messages of a given type
 *
 * @param {Array}  ranks Ranking array for the given message type.
 * @param {string} type  Message type
 * @param {Object} guild Discord guild object
 * @param {string} order Fastest or slowest - which way are the messages sorted?
 */
const createTimeRankingString = (ranks, type, guild, order) => {
  const ranking = ranks.map((row, index) => {
    const rankString = createRankingIndexString(index);
    const date = new Date(row.createdAt);
    const dateString = new Date(date).toLocaleDateString('fi-FI');

    return `${rankString} ${stripDiscordTag(row.name)} on ${dateString} at ${TimeUtils.createTimeString(date)}`;
  });

  let rankingString = `${guild.name} ${order} ${type} ranking`;
  rankingString = `${rankingString}\n${ranking.slice(0, MAX).join('\n')}`;

  return rankingString;
};

export default createTimeRankingString;
