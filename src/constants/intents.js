import { Intents } from 'discord.js';

/**
 * Discord.js intents that define what the bot is interested in.
 * @type {Intents}
 */
const intents = new Intents();
intents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
);

export default intents;
