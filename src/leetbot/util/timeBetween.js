import moment from 'moment-timezone';
import { TIMEZONE } from '../../constants/config';

/**
 * Checks if a date object is between a start and end date. Inclusive at the start of the interval,
 * exclusive at the end.
 * @param {Date} time       Time to check.
 * @param {Date} start      Start of valid time window.
 * @param {Date} start      End of valid time window.
 * @param {string} timezone Timezone to use. Follows moment.js timezone standards.
 * @returns {boolean} Is the time between the start and end time.
 */
const timeBetween = (time, startEpoch, endEpoch, timezone = TIMEZONE) => {
  const start = new Date(startEpoch);
  const end = new Date(endEpoch);

  const adjustedTime = moment.tz(time, timezone);

  let adjustedStart = moment.tz(start, timezone);
  adjustedStart = adjustedStart.set({
    hour: start.getHours(),
    minute: start.getMinutes(),
    second: start.getSeconds(),
  });

  let adjustedEnd = moment.tz(end, timezone);
  adjustedEnd = adjustedEnd.set({
    hour: end.getHours(),
    minute: end.getMinutes(),
    second: end.getSeconds(),
  });

  console.log('adjustedTime', adjustedTime.toString());
  console.log('adjustedEnd: ', adjustedEnd.toString());
  console.log('adjustedStart: ', adjustedStart.toString());
  console.log('-------');

  return adjustedStart <= adjustedTime && adjustedTime < adjustedEnd;
};

export default timeBetween;
