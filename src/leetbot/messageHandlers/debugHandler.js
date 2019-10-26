import DB from 'better-sqlite3-helper';
import User from '../classes/User';
import addUser from '../database/queries/addUser';

/**
 * Used for testing and debugging messages.
 * @param {object} msg Discord message object.
 */
const debugHandler = msg => {
  if (msg.content === '!add') {
    // Replace works like insert, but can update existing records.
    DB().replace('servers', {
      id: msg.guild.id,
      name: msg.guild.name,
    });

    const { author } = msg;
    const { id, tag, displayAvatarUrl } = author;
    const user = new User(id, tag, displayAvatarUrl);
    addUser(user);

    DB().insert('messages', {
      id: msg.id,
      type: 'OTHER',
      userId: msg.author.id,
      serverId: msg.guild.id,
    });

    msg.react('✅');
  }

  if (msg.content === '!delete') {
    const stmt = DB().prepare('DELETE FROM users WHERE id = ?');
    stmt.run(msg.author.id);
  }
};

export default debugHandler;
