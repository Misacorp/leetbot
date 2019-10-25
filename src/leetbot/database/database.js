import Database from 'better-sqlite3';

let db;
console.log('db file checking in', db);

const database = {
  /**
   * Open a database connection in a file if one does not already exist.
   * @param {string} path Path to database file.
   */
  open: (path = `${__dirname}/leet.db`) => {
    if (!db) {
      console.log('Creating new database at', path);
      db = new Database(path, { verbose: console.log });
    }
    return db;
  },

  /**
   * Close database connection.
   */
  close: () => {
    db.close();
  },

  /**
   * Database instance
   */
  getDB: () => db,

  /**
   * Create tables etc.
   */
  init: () => {
    db.run('CREATE TABLE IF NOT EXISTS messages(author text)');
    console.log('Created tables');
  },
};

export default database;
