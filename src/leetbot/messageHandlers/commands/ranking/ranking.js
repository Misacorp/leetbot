import logger from '../../../../logger';
import getRanking from '../../../../analysis/server/getRanking';
import * as types from '../../../../constants/messageTypes';

/**
 * Ranking command.
 * Gets the server ranking for a given message type.
 * @param {object} msg  Discord message object.
 * @param {string} type Message type (LEET, LEEB, FAILED_LEET)
 * @returns {Array|boolean} Ranking list descendingly sorted by count of the given type.
 */
const ranking = (msg, type) => {
  // Check that the wanted type is valid
  if (Object.keys(types).includes(type)) {
    const serverId = msg.guild.id;
    const serverRanking = getRanking(serverId, type);
    if (serverRanking) {
      return serverRanking;
    }
  }

  logger.error('Tried to get rankings for an unknown message type');
  return false;
};

export default ranking;
