import Server from '../classes/Server';

/**
 * Extracts a Server object from a Discord message.
 * @param {object} msg Discord.js message object.
 * @returns {Server} Server object representing the server to which the message was sent to.
 */
const serverFromMessage = (msg) => {
  const { guild } = msg;
  const { id, name, iconUrl } = guild;

  return new Server(id, name, iconUrl());
};

export default serverFromMessage;
