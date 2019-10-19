import containsEmoji from './emoji/containsEmoji';
import emojis from './emoji/emojis';

/**
 * Checks the message for the given emoji and performs actions to it.
 * @param {object}   msg       Discord message object.
 * @param {string}   emojiName Name of the wanted emoji.
 * @param {function} handler   Function to be called if the message contains the given emoji.
 */
const handleEmoji = (msg, emojiName, handler) => {
  if (msg && Object.prototype.hasOwnProperty.call(msg, 'content')) {
    if (emojis && Object.prototype.hasOwnProperty.call(emojis, emojiName)) {
      if (containsEmoji(msg, emojis[emojiName])) {
        handler(msg);
      }
    } else {
      console.warn(`No emoji with the name ${emojiName} was found.`);
    }
  } else {
    console.warn(`Message has no content.`);
  }
};

export default handleEmoji;
