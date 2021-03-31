import timeBetween from '../timeBetween';

/**
 * Returns true if a given date is on april fool's day.
 * @param {Date} date Date to test. Defaults to the current date.
 * @returns {boolean} Is the date
 */
const isAprilFools = (date = new Date()) => {
  if (process.env.ENV === 'development') {
    const devAprilFoolsStart = new Date().setSeconds(30);
    const devAprilFoolsEnd = new Date().setSeconds(50);
    return timeBetween(date, devAprilFoolsStart, devAprilFoolsEnd);
  }

  let start = new Date();
  start = new Date(start.setDate(1));
  start = new Date(start.setMonth(3));
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  return timeBetween(date, start, end);
};

export default isAprilFools;
