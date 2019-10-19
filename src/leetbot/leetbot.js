import Discord from 'discord.js';
import handleEmoji from './handleEmoji';
import emojis, { getEmojis } from './emoji/emojis';

import leetHandler from './messageHandlers/leetHandler';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getEmojis(client);
});

client.on('message', msg => {
  handleEmoji(msg, 'leet', message => leetHandler(message));
});

client.login('NjM1MDIwNTc3MjExNDE2NTc2.Xaq_9g.uAmJqCoDPqR8D3qiqYqWhIBhRjY');
