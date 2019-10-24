import Discord from 'discord.js';

import database from './database/database';
import handleEmoji from './handleEmoji';
import { getEmojis } from './emoji/emojis';
import poller from '../poller';
import updateStatus from './updateStatus';
import leetHandler from './messageHandlers/leetHandler';
import handleJarka from './messageHandlers/handleJarka';

database
  .open()
  .then(() => {
    database.init();
    console.log('This DB was opened:', database.getDB());
  })
  .catch(e => console.error(e));

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  getEmojis(client);
  poller(null, [() => updateStatus(client)]);
});

client.on('message', msg => {
  handleJarka(msg);
  handleEmoji(msg, 'leet', message => leetHandler(message));

  if (msg.content === '!dump') {
    database.getDB().all('SELECT DISTINCT * FROM messages', [], (err, rows) => {
      if (err) {
        console.error(err);
      }
      rows.forEach(r => console.log(r));
      msg.react('✅');
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
