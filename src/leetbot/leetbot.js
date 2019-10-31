import Discord from 'discord.js';

import database from './database/database';
import handleEmoji from './handleEmoji';
import { getEmojis } from './emoji/emojis';
import poller from '../poller';
import updateStatus from './updateStatus';
import leetHandler from './messageHandlers/leetHandler';
import leebHandler from './messageHandlers/leebHandler';
import debugHandler from './messageHandlers/debugHandler';
import handleJarka from './messageHandlers/handleJarka';

database.open();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getEmojis(client);
  poller(null, [() => updateStatus(client)]); // Start polling
});

client.on('message', msg => {
  handleJarka(msg);
  handleEmoji(msg, 'leet', message => leetHandler(message));
  handleEmoji(msg, 'leeb', message => leebHandler(message));
  debugHandler(msg);
});

client.login(process.env.DISCORD_TOKEN);
