import { POLLER_INTERVAL } from './constants/config';

/**
 * Creates a poller that runs at an interval.
 * @param {number} desiredInterval  Interval between ticks in milliseconds.
 * @param {array}  functions        Functions to call on each tick.
 * @returns {function} Callback to clear the interval.
 */
const poller = (desiredInterval, functions = []) => {
  let interval = desiredInterval;

  // Verify the interval was a number. Do not allow under polling rates under 1000ms.
  if (typeof interval !== 'number' || interval < 1000) {
    interval = POLLER_INTERVAL;
  }

  const ticker = setInterval(() => {
    functions.forEach(func => func());
  }, interval);

  return () => clearInterval(ticker);
};

export default poller;
