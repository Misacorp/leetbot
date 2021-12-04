import Discord from 'discord.js';

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

// Load .env into process.env
require('dotenv').config();

database.open();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getEmojis(client);
  poller(null, [() => updateStatus(client)]); // Start polling
});

client.on('message', msg => {
  if (!msg.author.bot) {
    const leetHandled = handleEmoji(msg, 'leet', message => leetHandler(message));

    if (!leetHandled) {
      const leebHandled = handleEmoji(msg, 'leeb', message => leebHandler(message));

      if (!leebHandled) {
        handlePhrases(msg);
        handleCommands(msg, client);
      }
    }

    debugHandler(msg);
  }
});

client.on('error', err => {
  console.warning('Leetbot caught the following client error', err);
});

client.login(process.env.DISCORD_TOKEN).catch(err => {
  if (!process.env.DISCORD_TOKEN) {
    console.log('Error! Token is undefined');
  }
  console.error(err);
});
