import validateString from '../util/validators/validateString';

/**
 * Represents a Discord user.
 * @param {string} id        Discord user id (Twitter snowflake). Must be a string
 *                           because of 64-bit number conversion intricacies.
 * @param {string} name      Discord user tag: Username#1234
 * @param {string} avatarUrl Link to the user's avatar image.
 */
class User {
  constructor(id, name, avatarUrl) {
    try {
      validateString(id, 8);
      this.id = id;
    } catch (e) {
      console.warn('The following error occurred when validating a User id');
      throw e;
    }

    try {
      validateString(name, 1);
      this.name = name;
    } catch (e) {
      console.warn('The following error occurred when validating a User name');
      throw e;
    }

    if (avatarUrl && typeof avatarUrl !== 'string') {
      throw new TypeError(`An avatar URL must be of type string. ${typeof avatarUrl} was given.`);
    }

    this.avatarUrl = avatarUrl;
  }
}

export default User;
