import logger from '../../../logger';
import findLeetLords from './findLeetLords';
import getLeetLordRole from './getLeetLordRole';

/**
 * Finds the leet lord(s) for the given server and updates their role accordingly.
 * Non-active leet lord roles are removed from users that no longer deserve them.
 * @param {string} serverID Server id
 * @param {Object} client   Discord.js client
 */
const updateLeetLords = (serverId, client) => {
  const leetLords = findLeetLords(serverId);

  if (leetLords) {
    // Get the leet lord role and its members
    const server = client.guilds.find(g => g.id === serverId);
    const role = getLeetLordRole(server);
    const currentLeetLords = role.members;

    console.log('currentLeetLords: ', currentLeetLords);

    // Remove the leet lord role from existing leet lords if necessary
    currentLeetLords
      .filter(current => !leetLords.some(lord => lord.id === current.id))
      .forEach(current => {
        // Remove the role
        current.removeRole(role);
      });

    // Filter leet lords to only include those that require updating
    leetLords
      .filter(lord => !currentLeetLords.some(current => current.id === lord.id))
      .forEach(user => {
        const member = server.members.find(m => m.id === user.id);
        member.addRole(role);

        logger.info(`Added leet lord role to ${member.user.username}`);
      });

    return true;
  }

  throw new Error('No leet lords could be determined');
};

export default updateLeetLords;
