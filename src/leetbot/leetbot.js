import Discord from 'discord.js';
import handleEmoji from './handleEmoji';
import { getEmojis } from './emoji/emojis';

import leetHandler from './messageHandlers/leetHandler';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getEmojis(client);
});

client.on('message', msg => {
  handleEmoji(msg, 'leet', message => leetHandler(message));
});

client.login(process.env.DISCORD_TOKEN);
