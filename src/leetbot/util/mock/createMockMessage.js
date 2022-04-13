import { v4 as uuid } from 'uuid';
import moment from 'moment-timezone';

import Message from '../../classes/Message';

import { TIMEZONE } from '../../../constants/config';

/**
 * Creates a mock message of a given type.
 * @param {Server} server Server object.
 * @param {User}   user   User object.
 * @param {string} type   Message type.
 */
const createMockMessage = (server, user, type) => {
  let hour = 10;
  let minute = 10;
  switch (type) {
    case 'LEET': {
      hour = 13;
      minute = 37;
      break;
    }
    case 'FAILED_LEET': {
      hour = 13;
      minute = 38;
      break;
    }
    case 'LEEB': {
      hour = 13;
      minute = 38;
      break;
    }
    default: {
      break;
    }
  }

  const time = moment.tz(new Date(), TIMEZONE);
  time.set({
    hour,
    minute,
    second: Math.floor(Math.random() * 60),
  });

  return new Message({
    id: uuid(),
    userId: user.id,
    serverId: server.id,
    type: 'LEET',
    createdAt: time.toDate(),
  });
};

export default createMockMessage;
