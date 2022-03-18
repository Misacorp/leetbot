import Discord, { Intents } from 'discord.js';

import database from './database/database';
import handleEmoji from './handleEmoji';
import { getEmojis } from './emoji/emojis';
import poller from './util/poller';
import updateStatus from './updateStatus';
import leetHandler from './messageHandlers/leetHandler';
import leebHandler from './messageHandlers/leebHandler';
import debugHandler from './messageHandlers/debugHandler';
import handleCommands from './messageHandlers/commands/handleCommands';
import handlePhrases from './messageHandlers/phrases/handlePhrases';
import logger from "../logger";

// Load .env into process.env
require('dotenv').config();

database.open();

const intents = new Intents();
intents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
);
const client = new Discord.Client({
  intents,
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getEmojis(client);
  console.log('emojis:', JSON.stringify(client.emojis));

  poller(null, [() => updateStatus(client)]); // Start polling
});

client.on('messageCreate', (msg) => {
  if (msg.author.bot) {
    return;
  }

  logger.info('emojis', JSON.stringify(msg.guild.emojis));

  const leetHandled = handleEmoji(msg, 'leet', (message) => leetHandler(message));

  if (!leetHandled) {
    const leebHandled = handleEmoji(msg, 'leeb', (message) => leebHandler(message));

    if (!leebHandled) {
      handlePhrases(msg);
      handleCommands(msg, client);
    }
  }

  debugHandler(msg);
});

client.on('error', (err) => {
  logger.warn('Leetbot caught the following client error', err);
});

client.login(process.env.DISCORD_TOKEN).catch((err) => {
  if (!process.env.DISCORD_TOKEN) {
    logger.warn('Error! Token is undefined');
  }
  logger.error(err);
});
