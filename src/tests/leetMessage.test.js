import uuid from 'uuid/v4';
import moment from 'moment-timezone';

import database from '../leetbot/database/database';
import createServer from './util/createServer';
import createUser from './util/createUser';
import Message from '../leetbot/classes/Message';
import addServerUserMessage from '../leetbot/database/queries/addServerUserMessage';
import getMessage from '../leetbot/database/queries/message/getMessage';

import { TIMEZONE } from '../constants/config';

const createLeetMessage = (server, user) => {
  const time = moment.tz(new Date(), TIMEZONE);
  time.set({
    hour: 13,
    minute: 37,
    second: Math.floor(Math.random() * 60),
  });

  return new Message({
    id: uuid(),
    userId: user.id,
    serverId: server.id,
    type: 'LEET',
    createdAt: new Date(time.toDate()),
  });
};

beforeAll(() => {
  return database.open();
});

afterAll(() => {
  return database.close();
});

describe('leet message', () => {
  it('creates a leet message with no errors', () => {
    const server = createServer();
    const user = createUser();
    const message = createLeetMessage(server, user);

    // console.log('message date', message.createdAt, typeof message.createdAt, message.createdAt instanceof Date);

    const dbInsertionSuccesss = addServerUserMessage(server, user, message);
    if (!dbInsertionSuccesss) throw new Error('Message could not be inserted');

    const fetchedMessage = new Message(getMessage(message.id));

    expect(fetchedMessage).toEqual(message);
  });
});
