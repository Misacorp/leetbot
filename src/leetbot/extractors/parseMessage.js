import Server from '../classes/Server';
import User from '../classes/User';
import Message from '../classes/Message';

/**
 * Parses a Discord message object and returns a Server, User and Message.
 * @param {object} msg  Discord.js message object.
 * @param {string} type Message type.
 * @returns {object} { server, user, message }
 */
const parseMessage = (msg, type) => {
  // Get server.
  const { guild } = msg;
  const { id: serverId, name: serverName } = guild;

  const server = new Server(serverId, serverName, guild.iconURL());

  // Get user.
  const { author } = msg;
  const { id: userId, tag } = author;
  const user = new User(userId, tag, author.displayAvatarURL());

  // Get message.
  const message = new Message({
    id: msg.id,
    userId,
    serverId,
    type,
    createdAt: msg.createdAt,
  });

  return { server, user, message };
};

export default parseMessage;
