import logger from '../../logger';
import getServer from '../../leetbot/database/queries/getServer';
import getMessagesByServer from '../../leetbot/database/queries/getMessagesByServer';
import countByUserByType from '../countByUserByType';

/**
 * Gets the ranking for a given message type on a given server.
 * @param {string}      serverId    Server id
 * @param {messageType} type        Type of message
 * @returns {Array} Array of objects containing the username and their number of messages of the given type.
 */
const getRanking = (serverId, type) => {
  try {
    const serverInfo = getServer(serverId);
    if (!serverInfo) {
      throw new Error(`No server exists with the id ${serverId}`);
    }

    const messages = getMessagesByServer(serverId);
    const countsByUserByType = countByUserByType(messages);

    // Sort the ranking by the given type, if a type was given.
    if (type) {
      return countsByUserByType.filter(row => row.counts[type] > 0).sort((a, b) => b.counts[type] - a.counts[type]);
    }

    // No type was given. Just return the results.
    return countsByUserByType;
  } catch (e) {
    logger.error(e);
    return null;
  }
};

export default getRanking;
