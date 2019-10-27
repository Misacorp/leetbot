import DB from 'better-sqlite3-helper';

import parseMessage from '../extractors/parseMessage';

import addServer from '../database/queries/addServer';
import addUser from '../database/queries/addUser';
import addMessage from '../database/queries/addMessage';

/**
 * Used for testing and debugging messages.
 * @param {object} msg Discord message object.
 */
const debugHandler = msg => {
  if (msg.content === '!add') {
    // Extract objects
    const { server, user, message } = parseMessage(msg, 'OTHER');

    // Add rows to database tables.
    addServer(server);
    addUser(user);
    addMessage(message);

    msg.react('✅');
  }

  if (msg.content === '!delete') {
    const stmt = DB().prepare('DELETE FROM users WHERE id = ?');
    stmt.run(msg.author.id);
  }
};

export default debugHandler;
