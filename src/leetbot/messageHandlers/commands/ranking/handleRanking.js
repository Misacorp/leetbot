import ranking from './ranking';
import { LEET, LEEB, FAILED_LEET } from '../../../../constants/messageTypes';
import createRankingString from './createRankingString';
import getMessagesByServerByTime from '../../../database/queries/getMessagesByServerByTime';
import createTimeRankingString from './createTimeRankingString';

/**
 * Handles a ranking command.
 * @param {object} msg  Discord.js message
 * @param {Array}  args Command arguments.
 * @returns {String|boolean} String representation of the requested ranking.
 */
const handleRanking = (msg, args) => {
  let content = 'Ranking komennon käyttö: @leetbot ranking <viestin tyyppi>';

  const uppercaseArgs = args.map(arg => arg.toUpperCase());

  // Handle each type of ranking similarly
  [LEET, LEEB, FAILED_LEET].forEach(type => {
    if (uppercaseArgs.includes(type)) {
      if (uppercaseArgs.includes('FASTEST')) {
        const ranks = getMessagesByServerByTime(msg.guild.id, type, 'ASC');
        content = createTimeRankingString(ranks, type, msg.guild, 'fastest');
      } else if (uppercaseArgs.includes('SLOWEST')) {
        const ranks = getMessagesByServerByTime(msg.guild.id, type, 'DESC');
        content = createTimeRankingString(ranks, type, msg.guild, 'slowest');
      } else {
        const ranks = ranking(msg, type);
        if (ranks) {
          content = createRankingString(ranks, type, msg.guild);
        }
      }
    }
  });

  msg.channel.send(content);
};

export default handleRanking;
