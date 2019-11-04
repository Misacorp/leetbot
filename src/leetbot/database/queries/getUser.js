import DB from 'better-sqlite3-helper';

/**
 * Gets a user's data from the database.
 * @param {string} id User id.
 */
const getUserById = id => {
  const stmt = DB().prepare(`SELECT * FROM users WHERE id = $id`);
  const result = stmt.get({ id });

  return result;
};

/**
 * Gets a user by ID.
 * @param {string} name User Discord tag Player#1234
 */
const getUserByName = name => {
  const stmt = DB().prepare(`SELECT * FROM users WHERE name = $name`);
  const result = stmt.get({ name });

  return result;
};

export { getUserById, getUserByName };
