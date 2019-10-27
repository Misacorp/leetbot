import DB from 'better-sqlite3-helper';

import Server from '../classes/Server';
import User from '../classes/User';
import Message from '../classes/Message';

import addServer from '../database/queries/addServer';
import addUser from '../database/queries/addUser';
import addMessage from '../database/queries/addMessage';

/**
 * Used for testing and debugging messages.
 * @param {object} msg Discord message object.
 */
const debugHandler = msg => {
  if (msg.content === '!add') {
    // Get server.
    const { guild } = msg;
    const { id: serverId, name: serverName, iconURL: serverIconUrl } = guild;
    const server = new Server(serverId, serverName, serverIconUrl);

    // Get user.
    const { author } = msg;
    const { id: userId, tag, displayAvatarUrl } = author;
    const user = new User(userId, tag, displayAvatarUrl);

    // Get message.
    const message = new Message(msg.id, userId, serverId, 'OTHER');

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
