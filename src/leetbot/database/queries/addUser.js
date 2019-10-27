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

  const stmt = DB().prepare(
    `INSERT OR REPLACE INTO users (id, name, avatarUrl) 
      VALUES ( $id, 
               COALESCE((SELECT name FROM users WHERE id = $id), $name),
               COALESCE((SELECT avatarUrl FROM users WHERE id = $id), $avatarUrl)
      );`,
  );

  stmt.run({ ...user });
};

export default addUser;
