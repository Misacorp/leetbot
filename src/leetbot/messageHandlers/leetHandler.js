import emojis from '../emoji/emojis';
import isLeet from '../isLeet';

/**
 * Checks if the message was created at 13:37 Finnish time and performs
 * some actions if it was.
 * @param {object} msg Discord message object.
 */
const leetHandler = msg => {
  const { createdAt } = msg;
  if (isLeet(createdAt)) {
    // Save an entry to our database's messages table with type 'LEET'

    msg.react(emojis.leet.id);
  } else {
    msg.react(emojis.leeb.id);
  }
};

export default leetHandler;
