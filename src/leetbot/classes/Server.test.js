import Server from './Server';

describe('Server', () => {
  it('does not allow a server without an id to be created', () => {
    expect(() => new Server()).toThrow();
  });

  it('does not allow a server with an empty id to be created', () => {
    expect(() => new Server('')).toThrow();
  });

  it('does not allow a server with no name to be created', () => {
    expect(() => new Server('1234567890')).toThrow();
  });

  it('creates a server successfully', () => {
    const server = new Server('1234567899', 'The Leeb');
    expect(server).toHaveProperty('id');
    expect(server).toHaveProperty('name');
  });

  it('creates a Server with an avatar succesfully', () => {
    const server = new Server('1234567899', 'The Leeb place', 'https://domain.net/icon.jpg');
    expect(server).toHaveProperty('id');
    expect(server).toHaveProperty('name');
    expect(server).toHaveProperty('iconUrl');
  });
});
