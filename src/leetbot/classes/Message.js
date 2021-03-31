import logger from '../../logger';

import validateString from '../util/validators/validateString';
import isLeet from '../util/dateTime/isLeet';
import isLeeb from '../util/dateTime/isLeeb';

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
  constructor(msg) {
    const { id, userId, serverId, type, createdAt } = msg;

    try {
      validateString(id, 8);
      this.id = id;

      validateString(userId, 8);
      this.userId = userId;

      validateString(serverId, 8);
      this.serverId = serverId;
    } catch (e) {
      logger.error(e);
      throw e;
    }

    // Validate createdAt
    if (!createdAt || typeof createdAt !== 'object' || !(createdAt instanceof Date)) {
      throw new Error(`The createdAt property of a message must be a valid Date object, got ${typeof createdAt}`);
    }
    this.createdAt = createdAt;

    if (type) {
      this.setType(type);
    }
  }

  /**
   * Sets the message type.
   * Enforces LEET, FAILED_LEET and LEEB types are not set if the createdAt time does not match.
   * @param {string} newType New type to set.
   */
  setType(newType) {
    try {
      validateString(newType);
      if (!messageTypes.includes(newType)) {
        throw new Error(
          `Invalid message type supplied to Message setType. Expected one of ${messageTypes} but got ${newType}`,
        );
      }

      // Type cannot be LEET if createdAt is not in the range [13:37, 13:38[
      if (newType === 'LEET' && !isLeet(this.createdAt)) {
        throw new Error(`Message type cannot be LEET when createdAt is ${this.createdAt}`);
      }

      // Type cannot be LEEB if createdAt is not in the range [13:38, 13:39[
      if (newType === 'LEEB' && !isLeeb(this.createdAt)) {
        throw new Error(`Message type cannot be LEEB when createdAt is ${this.createdAt}`);
      }

      // Type cannot be FAILED_LEET if createdAt is not in the range [13:38, 13:39[
      if (newType === 'FAILED_LEET' && !isLeeb(this.createdAt)) {
        throw new Error(`Message type cannot be FAILED_LEET when createdAt is ${this.createdAt}`);
      }

      this.type = newType;
    } catch (e) {
      logger.warn(e.message);
      throw e;
    }
  }
}

export default Message;
