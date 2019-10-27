import Message from '../classes/Message';

/**
 * Extracts a Message object from a Discord message.
 * @param {object} msg Discord.js message object.
 * @returns {Message} Message object representing the relevant parts of the message.
 */
const extractMessage = msg => {
  const { guild, author } = msg;
  const { id: serverId } = guild;
  const { id: userId } = author;

  return new Message(msg.id, userId, serverId, 'OTHER', msg.createdAt);
};

export default extractMessage;
