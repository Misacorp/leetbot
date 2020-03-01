import ranking from './ranking';
import { LEET, LEEB, FAILED_LEET } from '../../../../constants/messageTypes';
import createRankingString from './createRankingString';

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
      const ranks = ranking(msg, type);
      if (ranks) {
        content = createRankingString(ranks, type, msg.guild.name);
      }
    }
  });

  msg.channel.send(content);
};

export default handleRanking;
