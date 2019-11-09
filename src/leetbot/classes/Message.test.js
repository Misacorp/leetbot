import Message from './Message';

const badDate = new Date();
badDate.setHours(10);
badDate.setMinutes(10);

describe('Message', () => {
  it('does not allow a message without an id to be created', () => {
    expect(() => new Message({})).toThrow();
  });

  it('does not allow a message with an empty id to be created', () => {
    expect(() => new Message({ id: undefined })).toThrow();
  });

  it('does not allow a message without a userId to be created', () => {
    expect(() => new Message({ id: '1234567890' })).toThrow();
  });

  it('does not allow a message with an empty userId to be created', () => {
    expect(() => new Message({ id: '1234567890', userId: undefined })).toThrow();
  });

  it('does not allow a message without an serverId to be created', () => {
    expect(() => new Message({ id: '12345667890', userId: '88888888' })).toThrow();
  });

  it('does not allow a message with an empty serverId to be created', () => {
    expect(() => new Message({ id: '1234567890', userId: '88888888', serverId: undefined })).toThrow();
  });

  it('does not allow a message with no type to be created', () => {
    expect(() => new Message({ id: '1234567890', userId: '88888888', serverId: '00000000' })).toThrow();
  });

  it('does not allow a message with an unsupported type to be created', () => {
    expect(() => {
      return new Message({
        id: '1234567890',
        userId: '88888888',
        serverId: '00000000',
        type: 'THIS_TYPE_IS_NOT_SUPPORTED',
        createdAt: new Date(),
      });
    }).toThrow();
  });

  it('does not allow a message without a createdAt property to be created', () => {
    expect(() => {
      return new Message({ id: '1234567890', userId: '88888888', serverId: '00000000', type: 'OTHER' });
    }).toThrow();
  });

  it('creates a message successfully', () => {
    const message = new Message({
      id: '1234567890',
      userId: '88888888',
      serverId: '00000000',
      type: 'OTHER',
      createdAt: new Date(),
    });
    expect(message).toHaveProperty('id');
    expect(message).toHaveProperty('userId');
    expect(message).toHaveProperty('serverId');
    expect(message).toHaveProperty('type');
    expect(message).toHaveProperty('createdAt');
  });

  it('does not create a LEET message at a non-leet time', () => {
    expect(
      () =>
        new Message({ id: '1234567890', userId: '88888888', serverId: '000000000', type: 'LEET', createdAt: badDate }),
    ).toThrow();
  });

  it('creates a LEET message at a leet time', () => {
    const leet = new Date();
    leet.setHours(13);
    leet.setMinutes(37);
    leet.setSeconds(30);
    expect(
      new Message({ id: '1234567890', userId: '88888888', serverId: '000000000', type: 'LEET', createdAt: leet }),
    ).toEqual(expect.any(Message));
  });

  it('does not create a LEEB message at a non-leeb time', () => {
    expect(
      () =>
        new Message({ id: '1234567890', userId: '88888888', serverId: '000000000', type: 'LEEB', createdAt: badDate }),
    ).toThrow();
  });

  it('creates a LEEB message at a leeb time', () => {
    const leeb = new Date();
    leeb.setHours(13);
    leeb.setMinutes(38);
    leeb.setSeconds(30);
    expect(
      new Message({ id: '1234567890', userId: '88888888', serverId: '000000000', type: 'LEEB', createdAt: leeb }),
    ).toEqual(expect.any(Message));
  });

  it('does not create a FAILED_LEET message at a non-leet time', () => {
    expect(
      () =>
        new Message({
          id: '1234567890',
          userId: '88888888',
          serverId: '000000000',
          type: 'FAILED_LEET',
          createdAt: badDate,
        }),
    ).toThrow();
  });

  it('creates a FAILED_LEET message at a leeb time', () => {
    const time = new Date();
    time.setHours(13);
    time.setMinutes(38);
    time.setSeconds(30);
    expect(
      new Message({
        id: '1234567890',
        userId: '88888888',
        serverId: '000000000',
        type: 'FAILED_LEET',
        createdAt: time,
      }),
    ).toEqual(expect.any(Message));
  });
});
