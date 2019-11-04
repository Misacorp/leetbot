import DB from 'better-sqlite3-helper';

/**
 * Gets all messages of a given type by a specified user on a given server.
 * @param {number} serverId Server id.
 * @param {number} userId   User id.
 * @param {string} type     Message type.
 * @param {Date}   date     Date to check.
 * @returns {array} Array of message rows.
 */
const getMessageByTypeForServerUser = (serverId, userId, type) => {
  const stmt = DB().prepare(
    `SELECT id, createdAt, type FROM messages WHERE serverId = $serverId AND userId = $userId AND type = $type`,
  );
  const result = stmt.all({ serverId, userId, type });

  return result;
};

export default getMessageByTypeForServerUser;
