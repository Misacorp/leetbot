import DB from 'better-sqlite3-helper';

/**
 * Gets all messages for a given user id.
 * No server is specified.
 * @param {string} id User id
 */
const getMessagesByUserId = id => {
  const stmt = DB().prepare(
    `SELECT messages.id, userId, serverId, type, createdAt FROM messages
     INNER JOIN users ON userId = users.id
     WHERE users.id = $id`,
  );
  const result = stmt.all({ id });

  return result;
};

export default getMessagesByUserId;
