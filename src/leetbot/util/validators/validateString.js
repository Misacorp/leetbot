/**
 * Validates a string.
 * @param {any}    input     Input to validate.
 * @param {number} minLength Minimum length to enforce on the input string.
 */
const validateString = (input, minLength) => {
  if (typeof input !== 'string') {
    throw new TypeError(`User id must be of type string. ${typeof id} was given.`);
  }
  if (input.length < minLength) {
    throw new Error('User id must be at least 8 characters long');
  }
  return true;
};

export default validateString;
