import DB from 'better-sqlite3-helper';
import logger from '../../../logger';

/**
 * Gets information about a given server.
 * @param {string} id Server id;
 */
const getServer = id => {
  const stmt = DB().prepare(`SELECT * FROM servers WHERE id = $id`);
  const result = stmt.get({ id });

  if (!result) {
    logger.error(`Tried to get a server with id ${id} but one doesn't exist`);
    throw new Error(`No server exists with the id ${id}`);
  }

  return result;
};

export default getServer;
