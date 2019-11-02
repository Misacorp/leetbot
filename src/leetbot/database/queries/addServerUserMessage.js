import addServer from './addServer';
import addUser from './addUser';
import addMessage from './addMessage';

/**
 * Adds a server, user and message to the database.
 * The server and user details are updated if they already exist.
 * A message entry with the same id must not already exist.
 * @param {Server}  server  Server object.
 * @param {User}    user    User object.
 * @param {Message} message Message object.
 */
const addServerUserMessage = (server, user, message) => {
  try {
    addServer(server);
    addUser(user);
    addMessage(message);
  } catch (e) {
    return false;
  }

  return true;
};

export default addServerUserMessage;
