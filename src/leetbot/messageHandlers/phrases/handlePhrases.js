import leetHandler from '../leetHandler';
import leebHandler from '../leebHandler';
import isAprilFools from '../../util/dateTime/isAprilFools';
import emojis from '../../emoji/emojis';

/**
 * Handles phrases to this bot.
 * Phrases are simple preset messages sent by users.
 * @param {object} msg    Discord.js message
 * @param {object} client Discord.js bot client
 */
const handleCommands = msg => {
  const phrase = msg.content.trim().toLowerCase();

  if (!phrase) {
    return;
  }

  switch (phrase) {
    case 'leet':
      leetHandler(msg);
      break;
    case '1337':
      if (isAprilFools(msg.createdAt)) {
        msg.react(emojis.leet.id);
      } else {
        msg.react('🥔');
      }
      break;
    case 'leeb':
      leebHandler(msg);
      break;
    case '1338':
      if (isAprilFools(msg.createdAt)) {
        msg.react(emojis.leeb.id);
      } else {
        msg.react('🥔');
      }
      break;
    case 'winner winner cod dinner':
      msg.react('🐟');
      break;
    case 'winner winner chicken dinner':
      msg.react('🐔');
      break;
    default:
  }
};

export default handleCommands;
