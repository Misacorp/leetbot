import logger from '../../../../logger';
import parseMessage from '../../../extractors/parseMessage';
import updateLeetLords from '../../../operations/leetLord/updateLeetLords';

/**
 * Handles a leet lord command.
 * If successful, reacts with the ✅ emoji.
 * If no leet lord could be determined, reacts with the 🤷🏼‍♂️ emoji.
 * @param {object} msg    Discord.js message
 * @param {object} client Discord.js client
 */
const handleLeetLord = (msg, client) => {
  const { server } = parseMessage(msg);

  try {
    updateLeetLords(server.id, client);
    msg.react('✅');
  } catch (err) {
    logger.error(err);
    msg.react('🤷🏼‍♂️');
  }
};

export default handleLeetLord;
