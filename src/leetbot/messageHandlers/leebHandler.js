import emojis from '../emoji/emojis';
import isLeeb from '../isLeeb';

import parseMessage from '../../../dist/leetbot/extractors/parseMessage';
import addServer from '../../../dist/leetbot/database/queries/addServer';
import addUser from '../../../dist/leetbot/database/queries/addUser';
import addMessage from '../../../dist/leetbot/database/queries/addMessage';

/**
 * Checks if the message was created at 13:38 Finnish time and performs
 * some actions if it was.
 * @param {object} msg Discord message object.
 */
const leetHandler = msg => {
  const { createdAt } = msg;
  if (isLeeb(createdAt)) {
    // Extract objects
    const { server, user, message } = parseMessage(msg, 'LEEB');

    // Add rows to database tables.
    addServer(server);
    addUser(user);
    addMessage(message);

    msg.react(emojis.leeb.id);
  }
};

export default leetHandler;