import Discord from 'discord.js';

import database from './database/database';
import logger from '../logger';
import intents from '../constants/intents';
import onReady from './events/ready';
import onMessageCreate from './events/messageCreate';
import onError from './events/error';
import { DISCORD_TOKEN } from '../constants/config';

// Load .env into process.env
require('dotenv').config();

database.open();

// Create a bot client with intents
const client = new Discord.Client({
  intents,
});

// Register event handlers
client.on('ready', (readyClient) => {
  onReady(readyClient);
});

client.on('messageCreate', (msg) => {
  onMessageCreate(client, msg);
});

client.on('error', (err) => {
  onError(err);
});

// Start the bot
client.login(DISCORD_TOKEN).catch((err) => {
  if (!DISCORD_TOKEN) {
    logger.warn('Error! Token is undefined');
  }
  logger.error(err);
});
