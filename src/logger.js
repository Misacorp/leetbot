import appRoot from 'app-root-path';
import { createLogger, format, transports } from 'winston';
import { PROD } from './constants/config';

const LOGS_PATH = `${appRoot}/logs`;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'leet' },
  transports: [
    // Write all error logs
    new transports.File({ filename: `${LOGS_PATH}/leet-error.log`, level: 'error' }),
    // Write all logs with level 'info' and below
    new transports.File({ filename: `${LOGS_PATH}/leet-combined.log` }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (!PROD) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export default logger;
