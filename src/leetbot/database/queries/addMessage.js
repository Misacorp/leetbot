import DB from 'better-sqlite3-helper';
import Message from '../../classes/Message';

/**
 * Adds a message to the messages table.
 * If no message exists, one is inserted.
 * If a message with the same id already exists, the message's details are updated.
 * @param {Message} message Message object.
 */
const addMessage = message => {
  if (!(message instanceof Message)) {
    throw new TypeError('Cannot add message that is not an instance of Message to database.');
  }

  const stmt = DB().prepare(
    `INSERT INTO messages (id, userId, serverId, type, createdAt) 
      VALUES ( $id, $userId, $serverId, $type, $createdAt);`,
  );

  // Message createdAt is converted to an ISO string
  stmt.run({ ...message, createdAt: message.createdAt.toISOString() });
};

export default addMessage;
