import validateString from '../util/validators/validateString';

export const messageTypes = ['LEET', 'FAILED_LEET', 'LEEB', 'OTHER'];

/**
 * Represents a Discord message.
 * @param {string} id        Discord message id (Twitter snowflake). Must be a string
 *                           because of 64-bit number conversion intricacies.
 * @param {string} userId    Discord user id.
 * @param {string} serverId  Discord server id.
 * @param {string} type      Message type.
 * @param {Date}   createdAt Date object representing when the message was created.
 */
class Message {
  constructor(id, userId, serverId, type, createdAt) {
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

    this.setType(type);

    // Validate createdAt
    if (!createdAt || typeof createdAt !== 'object' || !(createdAt instanceof Date)) {
      throw new Error('The createdAt property of a message must be a valid Date object');
    }
    this.createdAt = createdAt;
  }

  setType(newType) {
    try {
      validateString(newType);
      if (!messageTypes.includes(newType)) {
        throw new Error(
          `Invalid message type supplied to Message setType. Expected one of ${messageTypes} but got ${newType}`,
        );
      }

      // Type cannot be LEET if createdAt is not in the range [13:37, 13:38[

      // Type cannot be LEEB if createdAt is not in the range [13:38, 13:39[

      // Type cannot be FAILED_LEET if createdAt is not in the range [13:38, 13:39[

      this.type = newType;
    } catch (e) {
      console.warn('The following error occurred when validating a Message type');
      throw e;
    }
  }
}

export default Message;
