/**
 * Finds the leet lord role object
 * @param {Object} server Discord.js server object
 * @returns {Object} Discord.js role object
 */
const getLeetLordRole = server => {
  const leetLordRole = server.roles.find(role => role.name === 'Leet Lord');
  return leetLordRole;
};

export default getLeetLordRole;
