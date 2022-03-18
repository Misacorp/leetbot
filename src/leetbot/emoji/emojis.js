import logger from '../../logger';

const emojis = [];

/**
 * Gets and stores a list of relevant emojis.
 * @param {object} client Discord client.
 * @returns {Object} Key-value pairs where the key is an emoji's name
 *                   and the value is the corresponding emoji object.
 */
function getEmojis(client) {
  logger.info(`Found ${client.emojis.cache.size} emojis`);

  // Add emojis to the emoji store
  client.emojis.cache.forEach((emoji) => {
    emojis.push(emoji);
  });

  return client.emojis.cache;
}

export default emojis;
export { getEmojis };
