import Server from '../classes/Server';
import User from '../classes/User';
import Message from '../classes/Message';

/**
 * Parses a Discord message object and returns a Server, User and Message.
 * @param {object} msg  Discord.js message object.
 * @param {string} type Message type.
 * @returns {object} { server, user, message }
 */
const parseMessage = (msg, type = 'OTHER') => {
  // Get server.
  const { guild } = msg;
  const { id: serverId, name: serverName, iconURL: serverIconUrl } = guild;
  const server = new Server(serverId, serverName, serverIconUrl);

  // Get user.
  const { author } = msg;
  const { id: userId, tag, displayAvatarUrl } = author;
  const user = new User(userId, tag, displayAvatarUrl);

  // Get message.
  const message = new Message(msg.id, userId, serverId, type, msg.createdAt);

  return { server, user, message };
};

export default parseMessage;
