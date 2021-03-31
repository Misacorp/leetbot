import timeBetween from './util/timeBetween';
import isLeet from './util/dateTime/isLeet';
import isLeeb from './util/dateTime/isLeeb';

const MINUTE_BEFORE = 'MINUTE_BEFORE';
const LEET = 'LEET';
const LEEB = 'LEEB';
const DEFAULT = 'DEFAULT';
let lastStatus = '';

/**
 * Updates the status of the bot based on the current time.
 * @param {object} client Discord.js client
 */
const updateStatus = client => {
  // Define the minute before leet
  const beforeLeetStart = new Date().setHours(13, 36, 0, 0);
  const beforeLeetEnd = new Date().setHours(13, 37, 0, 0);
  const isMinuteBeforeLeet = timeBetween(new Date(), beforeLeetStart, beforeLeetEnd);

  if (isMinuteBeforeLeet) {
    if (lastStatus !== MINUTE_BEFORE) {
      lastStatus = MINUTE_BEFORE;
      client.user.setActivity('you prepare', { type: 'WATCHING' });
    }
  } else if (isLeet()) {
    if (lastStatus !== LEET) {
      lastStatus = LEET;
      client.user.setActivity('you leet', { type: 'WATCHING' });
    }
  } else if (isLeeb()) {
    if (lastStatus !== LEEB) {
      lastStatus = LEEB;
      client.user.setActivity('the leebs', { type: 'WATCHING' });
    }
  } else if (lastStatus !== DEFAULT) {
    lastStatus = DEFAULT;
    client.user.setActivity('the clock', { type: 'WATCHING' });
  }
};

export default updateStatus;
