/**
 * Creates a user mention string.
 * @param {string} userId User id to mention.
 * @returns {string} Mention string.
 */
const createMention = userId => {
  return `<@!${userId}>`;
};

export default createMention;
