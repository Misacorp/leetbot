import validateString from '../util/validators/validateString';

/**
 * Represents a Discord server or guild.
 * @param {string} id      Discord server id (Twitter snowflake). Must be a string
 *                         because of 64-bit number conversion intricacies.
 * @param {string} name    Discord server name
 * @param {string} iconUrl Link to the server's icon URL.
 */
class Server {
  constructor(id, name, iconUrl) {
    try {
      validateString(id, 8);
      this.id = id;
    } catch (e) {
      console.warn('The following error occurred when validating a Server id');
      throw e;
    }

    try {
      validateString(name, 1);
      this.name = name;
    } catch (e) {
      console.warn('The following error occurred when validating a Server name');
      throw e;
    }

    if (iconUrl && typeof iconUrl !== 'string') {
      throw new TypeError(`A server icon URL must be of type string. ${typeof iconUrl} was given.`);
    }

    this.iconUrl = iconUrl;
  }
}

export default Server;
