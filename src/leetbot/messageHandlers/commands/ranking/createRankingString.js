import stripDiscordTag from '../../../util/stripDiscordTag';

/**
 * @param {Array}  ranks     Ranking array for the given message type.
 * @param {string} type      Message type
 * @param {string} guildName Discord server / guild name.
 */
const createRankingString = (ranks, type, guildName) => {
  const ranking = ranks.map((row, index) => {
    let rankString = `  ${index + 1}. `;

    // Give emoji medals to the top 3 ranks.
    if (index === 0) {
      rankString = '🥇';
    } else if (index === 1) {
      rankString = '🥈';
    } else if (index === 2) {
      rankString = '🥉';
    }

    return `${rankString} ${stripDiscordTag(row.name)} (${row.counts[type]})`;
  });

  let rankingString = `${guildName} ${type} ranking`;
  rankingString = `${rankingString}\n${ranking.join('\n')}`;

  return rankingString;
};

export default createRankingString;
