import checkExistingMessage from './checkExistingMessage';

/**
 * Checks if a message by the same user of the given type already exists on the server.
 * @param {Server}  server  Server object.
 * @param {User}    user    User object.
 * @param {Message} message Message object.
 * @returns {boolean} Does a message of this type already exist by the given user on the given server?
 */
const checkDuplicateMessage = (server, user, message) => {
  return checkExistingMessage(server, user, message, message.type);
};

export default checkDuplicateMessage;
