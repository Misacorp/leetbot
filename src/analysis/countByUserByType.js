import countByType from './countByType';

/**
 * Count the number of messages by user.
 * @param {Array}  messages Message rows.
 * @returns {Object} Type-count pairs.
 */
const countByUserByType = messages => {
  // Get the unique types of messages.
  const uniqueTypes = [];
  messages.forEach(row => {
    if (!uniqueTypes.includes(row.type)) {
      uniqueTypes.push(row.type);
    }
  });

  // Get unique user IDs.
  const uniqueUsers = {};
  messages.forEach(row => {
    const { userId, name } = row;
    if (!Object.keys(uniqueUsers).includes(userId)) {
      uniqueUsers[userId] = name;
    }
  });

  // Get count of each type of message per user.
  const userCounts = Object.keys(uniqueUsers).map(userId => {
    const userMessages = messages.filter(row => {
      // userId is an object key and thus a string.
      return String(row.userId) === userId;
    });
    const countsByType = countByType(userMessages);

    const userName = uniqueUsers[userId];

    return {
      id: userId,
      name: userName,
      counts: countsByType,
    };
  });

  return userCounts;
};

export default countByUserByType;
