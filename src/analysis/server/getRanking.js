import logger from '../../logger';
import getServer from '../../leetbot/database/queries/getServer';
import getMessagesByServer from '../../leetbot/database/queries/getMessagesByServer';
import countByUserByType from '../countByUserByType';

/**
 * Gets the ranking for a given message type on a given server.
 * @param {string}      serverId    Server id
 * @param {messageType} messageType Type of message
 * @returns {Array} Array of objects containing the username and their number of messages of the given type.
 */
const getRanking = (serverId, messageType) => {
  // Get user from DB
  try {
    const serverInfo = getServer(serverId);

    if (!serverInfo) {
      throw new Error(`No server exists with the id ${serverId}`);
    }

    const messages = getMessagesByServer(serverId);

    const countsByUserByType = countByUserByType(messages);
    return countsByUserByType;
  } catch (e) {
    logger.error(e);
  }
};

export default getRanking;
