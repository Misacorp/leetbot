import getMessageByTypeForServerUser from '../database/queries/getMessageByTypeForServerUser';
import timeBetween from '../util/timeBetween';

/**
 * Checks if a message by the same user of the given type already exists on the server.
 * @param {Server}  server  Server object.
 * @param {User}    user    User object.
 * @param {Message} message Message object.
 * @returns {boolean} Does a message of this type already exist by the given user on the given server?
 */
const checkDuplicateMessage = (server, user, message) => {
  const { id: serverId } = server;
  const { id: userId } = user;
  const { type } = message;

  const result = getMessageByTypeForServerUser(serverId, userId, type);

  // Create the bounds for the message's creation time for the given day.
  const { createdAt } = message;
  const createdDate = new Date(createdAt);

  const dayStart = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate(), 0, 0, 0, 0);
  const dayEnd = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate(), 23, 59, 59, 999);

  // Check each row and compare dates.
  let hasDuplicate = false;
  result.forEach(row => {
    const { createdAt: rowCreated } = row;
    const rowDate = new Date(rowCreated);
    if (timeBetween(rowDate, dayStart, dayEnd)) {
      hasDuplicate = true;
    }
  });

  return hasDuplicate;
};

export default checkDuplicateMessage;
