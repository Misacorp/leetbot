import timeBetween from './util/timeBetween';

/**
 * Returns true if a given time is in the leet-minute.
 * @param {Date} time Time to test. Defaults to the current time.
 * @returns {boolean} Is the time in the range [13:37, 13:38[
 */
const isLeet = (time = new Date()) => {
  const leetStart = new Date().setHours(13, 37, 0, 0);
  const leetEnd = new Date().setHours(13, 38, 0, 0);
  return timeBetween(time, leetStart, leetEnd);
};

export default isLeet;
