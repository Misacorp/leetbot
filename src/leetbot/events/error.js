import logger from '../../logger';

/**
 * Handles error events
 * @param err Error object
 */
const onError = (err) => {
  logger.warn('Leetbot caught the following client error', err);
};

export default onError;
