import parseMessage from '../extractors/parseMessage';

import addServer from '../database/queries/addServer';
import addUser from '../database/queries/addUser';
import addMessage from '../database/queries/addMessage';

/**
 * Used for testing and debugging messages.
 * @param {object} msg Discord message object.
 */
const debugHandler = msg => {
  // Extract objects
  const { server, user, message } = parseMessage(msg, 'OTHER');

  // Add rows to database tables.
  addServer(server);
  addUser(user);
  addMessage(message);

  if (msg.channel.name === 'bot') {
    msg.react('✅');
  }
};

export default debugHandler;
