import logger from '../../logger';
import emojis from '../emoji/emojis';

import parseMessage from '../extractors/parseMessage';
import addServerUserMessage from '../database/queries/addServerUserMessage';
import checkDuplicateMessage from './checkDuplicateMessage';
import checkExistingMessage from './checkExistingMessage';
import isLeet from '../util/dateTime/isLeet';
import isLeeb from '../util/dateTime/isLeeb';
import isAprilFools from '../util/dateTime/isAprilFools';

/**
 * Checks if the message was created at 13:38 Finnish time and performs
 * some actions if it was.
 * @param {object} msg Discord message object.
 * @returns {boolean} Was any message successfully inserted into the database?
 */
const leebHandler = msg => {
  let emoji;

  // Extract the Server, User and Message objects from the message.
  const { server, user, message } = parseMessage(msg);

  // The user sent a :leeb: emoji. Let's try to create a message of that type.
  try {
    message.setType('LEEB');
    emoji = emojis.leeb.id;

    if (isAprilFools(msg.createdAt)) {
      emoji = '🥔';
    }

    logger.info(`User ${user.name} is creating LEEB`);
  } catch (failedLeebErr) {
    // The time does not warrant a LEEB.
    // What is this user trying to do? Let's roll our eyes and return.
    msg.react('🙄');
    logger.info(`User ${user.name} tried to create LEEB for no reason and failed`);
    return false;
  }

  // Does a message already exist today?
  const alreadyExists = checkDuplicateMessage(server, user, message);
  const leetExists = checkExistingMessage(server, user, message, 'LEET');
  const failedLeetExists = checkExistingMessage(server, user, message, 'FAILED_LEET');

  if (alreadyExists || leetExists || failedLeetExists) {
    // A valid message was already posted by this user to this server today. Now they are trying
    // to get another one. This makes us ANGRY!
    if (isLeet(message.createdAt) || isLeeb(message.createdAt)) {
      msg.react('😠');
    }

    logger.info(`User ${user.name} already has a registered message today.`);

    return false;
  }

  // The LEEB is legit! Save it to the database.
  const dbInsertionSuccesss = addServerUserMessage(server, user, message);
  if (!dbInsertionSuccesss) {
    // Something went wrong when adding the rows. React with an appropriate emoji.
    msg.react('☠');
    return false;
  }

  // Everything went well. Let's celebrate with a reaction!
  msg.react(emoji);
  return true;
};

export default leebHandler;
