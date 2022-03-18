/**
 * Constructs an emoji string from an emoji object. The emoji string is what a message
 * contains when it has an emoji.
 * @param {GuildEmoji} emoji Discord emoji object.
 * @returns {string} Emoji string in the form <:name:id>
 */
const getEmojiString = (emoji) => emoji.toString();

export default getEmojiString;
