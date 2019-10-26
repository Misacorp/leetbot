import Database from 'better-sqlite3';
import init from './init';

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
};

export default database;
