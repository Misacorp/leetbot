class TimeUtils {
  /**
   * Creates a properly formatted millisecond string with leading zeroes
   * @param {Date} date Date object
   * @return {string}
   */
  static createMillisecondString(date) {
    const ms = date.getMilliseconds();

    if (ms < 10) {
      return `00${ms}`;
    }

    if (ms < 100) {
      return `0${ms}`;
    }

    return `${ms}`;
  }

  /**
   * Creates a formatted time string.
   * @param {Date} date Date object
   * @return {string} String representation of the exact time
   */
  static createTimeString(date) {
    const msString = TimeUtils.createMillisecondString(date);
    return `${date.toLocaleTimeString('sv-SE')}.${msString}`;
  }
}

export default TimeUtils;
