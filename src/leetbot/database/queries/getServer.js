import DB from 'better-sqlite3-helper';

/**
 * Gets information about a given server.
 * @param {string} id Server id;
 */
const getServer = id => {
  const stmt = DB().prepare(`SELECT * FROM servers WHERE id = $id`);
  const result = stmt.get({ id });

  return result;
};

export default getServer;
