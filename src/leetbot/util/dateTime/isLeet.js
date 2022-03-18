import timeBetween from '../timeBetween';
import { DEV } from '../../../constants/config';

/**
 * Returns true if a given time is in the leet-minute.
 * @param {Date} time Time to test. Defaults to the current time.
 * @returns {boolean} Is the time in the range [13:37, 13:38[
 */
const isLeet = (time = new Date()) => {
  // In dev mode leet is between the 20th and 40th second of each minute.
  if (DEV) {
    const devLeetStart = new Date().setSeconds(20);
    const devLeetEnd = new Date().setSeconds(40);
    return timeBetween(time, devLeetStart, devLeetEnd);
  }

  const leetStart = new Date().setHours(13, 37, 0, 0);
  const leetEnd = new Date().setHours(13, 38, 0, 0);
  return timeBetween(time, leetStart, leetEnd);
};

export default isLeet;
