import Discord from 'discord.js';

import database from './database/database';
import handleEmoji from './handleEmoji';
import { getEmojis } from './emoji/emojis';
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
});

client.on('message', msg => {
  handleJarka(msg);
  handleEmoji(msg, 'leet', message => leetHandler(message));
  database.getDB().run(`INSERT INTO messages(author) VALUES(?)`, [msg.author.tag], function insertName(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);

    return this.lastID;
  });

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
