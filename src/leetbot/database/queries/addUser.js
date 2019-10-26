import DB from 'better-sqlite3-helper';
import User from '../../classes/User';

/**
 * Adds a user to the users table.
 * If no user exists, one is inserted.
 * If a user with the same id already exists, the user's details are updated.
 * @param {User} user User object.
 */
const addUser = user => {
  if (!(user instanceof User)) {
    throw new TypeError('Cannot add user that is not an instance of User to database.');
  }
  console.log('(TODO) Adding user to database');

  DB().replace('users', user);
};

export default addUser;
