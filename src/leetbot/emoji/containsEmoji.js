import getEmojiString from './getEmojiString';

/**
 * Checks if a message contains a given emoji.
 * @param {object}      msg    Message object
 * @param {GuildEmoji}  emoji  Emoji object
 * @param {boolean}     strict Allow only messages that contain nothing but a single emoji.
 * @returns {boolean} Did the message contain the given emoji?
 */
const containsEmoji = (msg, emoji, strict = true) => {
  if (!msg || !Object.prototype.hasOwnProperty.call(msg, 'content')) {
    // Message has no content
    return false;
  }

  const emojiString = getEmojiString(emoji);

  if (emojiString) {
    if (strict) {
      return msg.content.trim() === emojiString;
    }
    return msg.content.indexOf(emojiString) > -1;
  }
  return false;
};

export default containsEmoji;
