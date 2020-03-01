import Discord from 'discord.js';

import database from './database/database';
import handleEmoji from './handleEmoji';
import { getEmojis } from './emoji/emojis';
import poller from './util/poller';
import updateStatus from './updateStatus';
import leetHandler from './messageHandlers/leetHandler';
import leebHandler from './messageHandlers/leebHandler';
import debugHandler from './messageHandlers/debugHandler';
import handleJarka from './messageHandlers/handleJarka';
import handleCommands from './messageHandlers/commands/handleCommands';

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
    handleJarka(msg);
    handleEmoji(msg, 'leet', message => leetHandler(message));
    handleEmoji(msg, 'leeb', message => leebHandler(message));
    handleCommands(msg, client);
    debugHandler(msg);
  }
});

client.login(process.env.DISCORD_TOKEN).catch(err => {
  if (!process.env.DISCORD_TOKEN) {
    console.log('Error! Token is undefined');
  }
  console.error(err);
});
