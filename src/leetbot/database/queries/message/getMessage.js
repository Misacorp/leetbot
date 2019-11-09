import DB from 'better-sqlite3-helper';

/**
 * Get a message by id.
 */
const getMessage = id => {
  const stmt = DB().prepare(`SELECT * FROM messages WHERE id = $id`);
  const result = stmt.get({ id });

  return result;
};

export default getMessage;
