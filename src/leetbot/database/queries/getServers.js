import DB from 'better-sqlite3-helper';

/**
 * Gets basic information about all servers.
 */
const getServers = () => {
  const stmt = DB().prepare(`SELECT id, name, iconUrl FROM servers`);
  const result = stmt.all();

  return result;
};

export default getServers;
