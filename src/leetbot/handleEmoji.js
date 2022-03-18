import logger from '../logger';

import containsEmoji from './emoji/containsEmoji';
import emojis from './emoji/emojis';

/**
 * Checks the message for the given emoji and performs actions to it.
 * @param {object}   msg       Discord message object.
 * @param {string}   emojiName Name of the wanted emoji.
 * @param {function} handler   Function to be called if the message contains the given emoji.
 * @returns {boolean} Was the emoji handled successfully?
 */
const handleEmoji = (msg, emojiName, handler) => {
  const wantedEmoji = emojis.find((emoji) => emoji.name === emojiName);

  if (wantedEmoji) {
    if (containsEmoji(msg, wantedEmoji)) {
      return handler(msg);
    }
  } else {
    logger.info('No emoji found with the name', emojiName);
  }

  return false;
};

export default handleEmoji;
