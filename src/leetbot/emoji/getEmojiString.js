/**
 * Constructs an emoji string from an emoji object. The emoji string is what a message
 * contains when it has an emoji.
 * @param {object} emoji Discord emoji object.
 * @returns {string} Emoji string in the form <:name:id>
 */
const getEmojiString = emoji => `<:${emoji.name}:${emoji.id}>`;

export default getEmojiString;
