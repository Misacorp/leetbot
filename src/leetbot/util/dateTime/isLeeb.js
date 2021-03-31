import timeBetween from '../timeBetween';

/**
 * Returns true if a given time is in the leeb-minute.
 * @param {Date} time Time to test. Defaults to the current time.
 * @returns {boolean} Is the time in the range [13:38, 13:39[
 */
const isLeeb = (time = new Date()) => {
  // In dev mode leeb is between the 40th and 60th second of each minute.
  if (process.env.ENV === 'development') {
    const devLeetStart = new Date().setSeconds(40);
    const devLeetEnd = new Date().setSeconds(60);
    return timeBetween(time, devLeetStart, devLeetEnd);
  }

  const leetStart = new Date().setHours(13, 38, 0, 0);
  const leetEnd = new Date().setHours(13, 39, 0, 0);
  return timeBetween(time, leetStart, leetEnd);
};

export default isLeeb;
