import User from '../classes/User';

/**
 * Extracts a User object from a Discord message.
 * @param {object} msg Discord.js message object.
 * @returns {User} User object representing the user that sent the message.
 */
const userFromMessage = msg => {
  const { author } = msg;
  const { id: userId, tag, displayAvatarUrl } = author;

  return new User(userId, tag, displayAvatarUrl);
};

export default userFromMessage;
