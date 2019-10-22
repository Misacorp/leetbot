import emojis from '../emoji/emojis';
import timeBetween from '../util/timeBetween';

const leetStart = new Date().setHours(13, 37, 0);
const leetEnd = new Date().setHours(13, 38, 0);

/**
 * Checks if the message was created at 13:37 Finnish time and performs
 * some actions if it was.
 * @param {object} msg Discord message object.
 */
const leetHandler = msg => {
  const { createdAt } = msg;
  if (timeBetween(createdAt, leetStart, leetEnd)) {
    msg.react(emojis.leet.id);
  } else {
    msg.react(emojis.leeb.id);
  }
};

export default leetHandler;
