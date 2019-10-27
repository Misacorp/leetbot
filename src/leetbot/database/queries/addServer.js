import DB from 'better-sqlite3-helper';

import Server from '../../classes/Server';

/**
 * Adds a server to the servers table.
 * If no server exists, one is inserted.
 * If a servr with the same id already exists, the server's details are updated.
 * @param {Server} server Server object.
 */
const addServer = server => {
  if (!(server instanceof Server)) {
    throw new TypeError('Cannot add server that is not an instance of Server to database.');
  }

  const stmt = DB().prepare(
    `INSERT OR REPLACE INTO servers (id, name, iconUrl) 
      VALUES ( $id, 
               COALESCE((SELECT name FROM servers WHERE id = $id), $name),
               COALESCE((SELECT iconUrl FROM servers WHERE id = $id), $iconUrl)
      );`,
  );

  stmt.run({ ...server });
};

export default addServer;
