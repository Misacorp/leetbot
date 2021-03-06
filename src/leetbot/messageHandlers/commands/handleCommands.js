import parseCommand from './parseCommand';
import handleRanking from './ranking/handleRanking';
import handleLeetLord from './leetLord/handleLeetLord';

/**
 * Handles commands to this bot.
 * @param {object} msg    Discord.js message
 * @param {object} client Discord.js bot client
 */
const handleCommands = (msg, client) => {
  const commandResult = parseCommand(msg, client);

  // Command was not valid or could not be parsed.
  if (!commandResult) {
    return;
  }

  const [command, args] = commandResult;
  switch (command) {
    case 'ranking':
      handleRanking(msg, args);
      break;
    case 'leetlord':
      handleLeetLord(msg, client);
      break;
    default:
  }
};

export default handleCommands;
