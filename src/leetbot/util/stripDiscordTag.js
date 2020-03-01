/**
 * Strips the Discord number tag from the end of a Discord user's name.
 * @param {string} name Discord name with the numeric tag at the end.
 */
const stripDiscordTag = name => name.substring(0, name.length - 5);

export default stripDiscordTag;
