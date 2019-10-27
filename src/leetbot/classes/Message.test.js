import Message from './Message';

describe('Message', () => {
  it('does not allow a message without an id to be created', () => {
    expect(() => new Message()).toThrow();
  });

  it('does not allow a message with an empty id to be created', () => {
    expect(() => new Message('')).toThrow();
  });

  it('does not allow a message with no name to be created', () => {
    expect(() => new Message('1234567890')).toThrow();
  });

  it('creates a message successfully', () => {
    const message = new Message('1234567899', 'The Leeb');
    expect(message).toHaveProperty('id');
    expect(message).toHaveProperty('name');
  });

  it('creates a Message with an avatar succesfully', () => {
    const message = new Message('1234567899', 'The Leeb place', 'https://domain.net/icon.jpg');
    expect(message).toHaveProperty('id');
    expect(message).toHaveProperty('name');
    expect(message).toHaveProperty('iconUrl');
  });
});
