import User from './User';

describe('User', () => {
  it('does not allow a user without an id to be created', () => {
    expect(() => new User()).toThrow();
  });

  it('does not allow a user with an empty id to be created', () => {
    expect(() => new User('')).toThrow();
  });

  it('does not allow a user with no name to be created', () => {
    expect(() => new User('1234567890')).toThrow();
  });

  it('creates a user successfully', () => {
    const user = new User('1234567899', 'The Leeb');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
  });

  it('creates a user with an avatar succesfully', () => {
    const user = new User('1234567899', 'The Leeb', 'https://domain.net/avatar.jpg');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('avatarUrl');
  });
});
