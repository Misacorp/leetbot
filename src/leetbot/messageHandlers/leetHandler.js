import moment from 'moment-timezone';
import emojis from '../emoji/emojis';

const timezone = 'Europe/Helsinki';

const leetStart = new Date().setHours(13, 37, 0);
const adjustedLeetStart = moment(leetStart).tz(timezone);
const leetEnd = new Date().setHours(13, 38, 0);
const adjustedLeetEnd = moment(leetEnd).tz(timezone);

/**
 * Checks if the message was created at 13:37 Finnish time and performs
 * some actions if it was.
 * @param {object} msg Discord message object.
 */
const leetHandler = msg => {
  const { createdAt } = msg;
  const adjustedTime = moment(createdAt).tz(timezone);
  console.log('adjustedTime: ', adjustedTime);

  if (adjustedTime >= adjustedLeetStart && adjustedTime < adjustedLeetEnd) {
    msg.react(emojis.leet.id);
  } else {
    msg.react(emojis.leeb.id);
  }
};

export default leetHandler;
