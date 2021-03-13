import DB from 'better-sqlite3-helper';

/**
 * Get all messages of a given on a given server sorted by the time within the minute they were posted.
 *
 * @param {string} serverId Server ID
 * @param {string} type     Message type
 * @param {string} order    Sorting order
 */
const getMessagesByServerByTime = (serverId, type, order) => {
  let finalOrder = 'ASC';
  if (order === 'DESC') {
    finalOrder = 'DESC';
  }

  const stmt = DB().prepare(
    `SELECT cast(messages.userId as text) as userId, messages.type, users.name, createdAt FROM messages
         JOIN users ON messages.userId = users.id
         WHERE messages.type = $type
           AND serverId = $serverId
         ORDER BY STRFTIME("%f", createdAt) ${finalOrder}
         LIMIT 10;
     `,
  );

  return stmt.all({ serverId, type });
};

export default getMessagesByServerByTime;
