import validateString from '../util/validators/validateString';

const types = ['LEET', 'FAILED_LEET', 'LEEB', 'OTHER'];

/**
 * Represents a Discord message.
 * @param {string} id       Discord message id (Twitter snowflake). Must be a string
 *                          because of 64-bit number conversion intricacies.
 * @param {string} userId   Discord user id.
 * @param {string} serverId Discord server id.
 * @param {string} type     Message type.
 */
class Message {
  constructor(id, userId, serverId, type) {
    try {
      validateString(id, 8);
      this.id = id;
    } catch (e) {
      console.warn('The following error occurred when validating a Message id');
      throw e;
    }
    try {
      validateString(userId, 8);
      this.userId = userId;
    } catch (e) {
      console.warn('The following error occurred when validating a User id on Message creation');
      throw e;
    }
    try {
      validateString(serverId, 8);
      this.serverId = serverId;
    } catch (e) {
      console.warn('The following error occurred when validating a Server id on Message creation');
      throw e;
    }

    try {
      validateString(type);
      if (!types.includes(type)) {
        throw new Error(
          `Invalid message type supplied to Message constructor. Expected one of ${types} but got ${type}`,
        );
      }
      this.type = type;
    } catch (e) {
      console.warn('The following error occurred when validating a Message type');
      throw e;
    }
  }
}

export default Message;
