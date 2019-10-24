import timeBetween from './util/timeBetween';

/**
 * Returns true if a given time is in the leeb-minute.
 * @param {Date} time Time to test. Defaults to the current time.
 * @returns {boolean} Is the time in the range [13:38, 13:39[
 */
const isLeeb = (time = new Date()) => {
  const leetStart = new Date().setHours(13, 33, 0);
  const leetEnd = new Date().setHours(13, 39, 0);
  return timeBetween(time, leetStart, leetEnd);
};

export default isLeeb;
