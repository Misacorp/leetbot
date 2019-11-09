import DB from 'better-sqlite3-helper';

/**
 * Gets all messages for a given username.
 * No server is specified.
 * @param {string} name Discord tag
 */
const getMessagesByUsername = name => {
  const stmt = DB().prepare(
    `SELECT messages.id, userId, serverId, type, createdAt FROM messages
     INNER JOIN users ON userId = users.id
     WHERE users.name = $name`,
  );
  const result = stmt.all({ name });

  return result;
};

export default getMessagesByUsername;
