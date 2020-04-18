import { LEET } from '../../../constants/messageTypes';
import getRanking from '../../../analysis/server/getRanking';

/**
 * Determines the leet lords for the given server.
 * A leet lord has the most leets.
 * @param {string} serverId Server id
 * @returns {Array} Array of users with the highest number of leets
 */
const findLeetLords = serverId => {
  const serverRanking = getRanking(serverId, LEET);

  if (Array.isArray(serverRanking) && serverRanking.length > 0) {
    // Determine the highest number of leets between all users.
    const highestLeet = serverRanking.reduce((highest, user) => {
      return Math.max(highest, user.counts[LEET]);
    }, 0);

    // Get the users with the highest number of leets.
    const topUsers = serverRanking.filter(user => user.counts[LEET] === highestLeet);

    return topUsers;
  }

  return [];
};

export default findLeetLords;
