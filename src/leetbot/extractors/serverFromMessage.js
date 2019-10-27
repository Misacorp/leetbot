import Server from '../classes/Server';

/**
 * Extracts a Server object from a Discord message.
 * @param {object} msg Discord.js message object.
 * @returns {Server} Server object representing the server to which the message was sent to.
 */
const serverFromMessage = msg => {
  const { guild } = msg;
  const { id: serverId, name: serverName, iconURL: serverIconUrl } = guild;

  return new Server(serverId, serverName, serverIconUrl);
};

export default serverFromMessage;
