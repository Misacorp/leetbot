import DB from 'better-sqlite3-helper';

/**
 * Get all messages by all users on a server.
 * @param {string} serverId Server ID.
 */
const getMessagesByServer = serverId => {
  const stmt = DB().prepare(
    `SELECT messages.userId, messages.type, users.name FROM messages
     INNER JOIN users ON messages.userId = users.id
     WHERE messages.serverId = $serverId`,
  );
  const result = stmt.all({ serverId });

  return result;
};

export default getMessagesByServer;
