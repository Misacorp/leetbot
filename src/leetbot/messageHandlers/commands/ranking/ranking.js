import getRanking from '../../../../analysis/server/getRanking';

/**
 * Ranking command.
 * Gets the server ranking for a given message type.
 * @param {object} msg  Discord message object.
 * @param {string} type Message type (LEET, LEEB, FAILED_LEET)
 */
const ranking = (msg, type) => {
  const serverId = msg.guild.id;
  const serverRanking = getRanking(serverId, type);

  // TODO: Sort by count of given type.

  return serverRanking;
};

export default ranking;
