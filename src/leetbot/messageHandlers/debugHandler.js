import parseMessage from '../extractors/parseMessage';

import addServer from '../database/queries/addServer';
import addUser from '../database/queries/addUser';
import addMessage from '../database/queries/addMessage';
// import checkDuplicateMessage from './checkDuplicateMessage';

const useDebugHandler = process.env.ENV === 'development';

/**
 * Used for testing and debugging messages.
 * @param {object} msg Discord message object.
 */
const debugHandler = msg => {
  if (useDebugHandler && msg.channel.name === 'bot') {
    // Extract objects
    const { server, user, message } = parseMessage(msg, 'OTHER');

    // Add rows to database tables.
    try {
      // Does a message of the created type already exist on this server today?
      // const alreadyExists = checkDuplicateMessage(server, user, message);

      addServer(server);
      addUser(user);
      addMessage(message);

      msg.react('✅');
    } catch (e) {
      console.log('The following error occurred when attempting to add these items to the database');
      console.log('Server:', server);
      console.log('User:', user);
      console.log('Message:', message);
      console.error(e);
    }
  }
};

export default debugHandler;
