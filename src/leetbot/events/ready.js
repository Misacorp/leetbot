import { getEmojis } from '../emoji/emojis';
import poller from '../util/poller';
import updateStatus from '../updateStatus';
import logger from '../../logger';

/**
 * Handles the bot becoming ready. Called after it has logged in.
 * @param client Bot client
 */
const onReady = (client) => {
  logger.info(`Logged in as ${client.user.tag}!`);

  getEmojis(client);

  poller(undefined, [() => updateStatus(client)]); // Start polling
};

export default onReady;
