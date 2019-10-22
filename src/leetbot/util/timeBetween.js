import moment from 'moment-timezone';
import { TIMEZONE } from '../../constants/config';

/**
 * Checks if a date object is between a start and end date. Inclusive at the start of the interval,
 * exclusive at th end.
 * @param {Date} time       Time to check.
 * @param {Date} start      Start of valid time window.
 * @param {Date} start      End of valid time window.
 * @param {string} timezone Timezone to use. Follows moment.js timezone standards.
 * @returns {boolean} Is the time between the start and end time.
 */
const timeBetween = (time, start, end, timezone = TIMEZONE) => {
  const adjustedTime = moment(time).tz(timezone);
  const adjustedStart = moment(start).tz(timezone);
  const adjustedEnd = moment(end).tz(timezone);

  return adjustedStart <= adjustedTime && adjustedTime < adjustedEnd;
};

export default timeBetween;
