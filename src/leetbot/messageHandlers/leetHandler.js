import emojis from '../emoji/emojis';

import parseMessage from '../extractors/parseMessage';
import addServerUserMessage from '../database/queries/addServerUserMessage';

/**
 * Checks if the message was created at 13:37 Finnish time and performs
 * some actions if it was.
 * @param {object} msg Discord message object.
 * @returns {boolean} Was any message successfully inserted into the database?
 */
const leetHandler = msg => {
  let emoji;

  // Extract the Server, User and Message objects from the message.
  const { server, user, message } = parseMessage(msg);

  // The user sent a :leet: emoji. Let's try to create a message of that type.
  try {
    message.setType('LEET');
    emoji = emojis.leet.id;
  } catch (leetErr) {
    try {
      message.setType('FAILED_LEET');
      emoji = emojis.leeb.id;
    } catch (failedLeetErr) {
      // The time does not warrant a LEET or FAILED LEET.
      // What is this user trying to do? Let's roll our eyes and return.
      msg.react('🙄');
      return false;
    }
  }

  // Add rows to database tables.
  const dbInsertionSuccesss = addServerUserMessage(server, user, message);
  if (!dbInsertionSuccesss) {
    // Something went wrong when adding the rows. React with an appropriate emoji.
    msg.react('☠');
    return false;
  }

  // Everything went well. Let's celebrate with a reaction!
  msg.react(emoji);
  return true;
};

export default leetHandler;
