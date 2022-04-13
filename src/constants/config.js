// Load env variables to process.env
import dotenv from 'dotenv';

dotenv.config();

export const POLLER_INTERVAL = 3000;
export const DEV = process.env.ENV === 'development';
export const PROD = process.env.ENV === 'production';
export const TEST = process.env.ENV === 'test';
export const {
  PORT = 8080,
  CLIENT_PATH,
  CLIENT_URL,
  ALLOWED_ORIGINS,
  DISCORD_TOKEN,
  TIMEZONE = 'Europe/Helsinki',
} = process.env;
