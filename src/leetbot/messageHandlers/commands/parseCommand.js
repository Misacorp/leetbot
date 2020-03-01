import createMention from '../../util/createMention';

/**
 * Parses a command, returning it and its arguments.
 *
 * Commands are always of the following form
 * @this_bot_mention command [argument, ...]
 *
 * @param {object} msg    Discord.js message
 * @param {object} client Discord.js bot client
 * @returns {Array} Tuple where the first parameter is the command name and the second is an array of argument strings.
 */
const parseCommand = (msg, client) => {
  // The bot must be mentioned in a command.
  if (msg.isMentioned(client.user)) {
    const { content } = msg;
    const contentWithoutBotMention = content.replace(createMention(client.user.id), '').trim();

    const words = contentWithoutBotMention.split(' ');
    if (words.length > 0) {
      const command = words[0];
      const args = words.slice(1, words.length);

      return [command, args];
    }
  }

  return false;
};

export default parseCommand;
