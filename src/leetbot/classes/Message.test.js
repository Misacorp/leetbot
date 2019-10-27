import Message, { messageTypes } from './Message';

describe('Message', () => {
  it('does not allow a message without an id to be created', () => {
    expect(() => new Message()).toThrow();
  });

  it('does not allow a message with an empty id to be created', () => {
    expect(() => new Message('')).toThrow();
  });

  it('does not allow a message without a userId to be created', () => {
    expect(() => new Message('1234567890')).toThrow();
  });

  it('does not allow a message with an empty userId to be created', () => {
    expect(() => new Message('1234567890', '')).toThrow();
  });

  it('does not allow a message without an serverId to be created', () => {
    expect(() => new Message('12345667890', '88888888')).toThrow();
  });

  it('does not allow a message with an empty serverId to be created', () => {
    expect(() => new Message('1234567890', '88888888', '')).toThrow();
  });

  it('does not allow a message with no type to be created', () => {
    expect(() => new Message('1234567890', '88888888', '00000000')).toThrow();
  });

  it('does not allow a message with an unsupported type to be created', () => {
    expect(() => {
      return new Message('1234567890', '88888888', '00000000', 'THIS_TYPE_IS_NOT_SUPPORTED', new Date());
    }).toThrow();
  });

  it('does not allow a message without a createdAt property to be created', () => {
    expect(() => {
      return new Message('1234567890', '88888888', '00000000', messageTypes[0]);
    }).toThrow();
  });

  it('creates a message successfully', () => {
    const message = new Message('1234567890', '88888888', '00000000', messageTypes[0], new Date());
    expect(message).toHaveProperty('id');
    expect(message).toHaveProperty('userId');
    expect(message).toHaveProperty('serverId');
    expect(message).toHaveProperty('type');
    expect(message).toHaveProperty('createdAt');
  });
});
