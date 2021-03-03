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
  if (msg && Object.prototype.hasOwnProperty.call(msg, 'content')) {
    if (emojis && Object.prototype.hasOwnProperty.call(emojis, emojiName)) {
      if (containsEmoji(msg, emojis[emojiName])) {
        return handler(msg);
      }
    } else {
      logger.warn(`No emoji with the name ${emojiName} was found.`);
    }
  } else {
    logger.warn(`Message has no content.`);
  }

  return false;
};

export default handleEmoji;
