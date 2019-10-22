import sqlite3 from 'sqlite3';

sqlite3.verbose();
let db;

const database = {
  /**
   * Open a database connection in a file.
   */
  open: (path = `${__dirname}/leet.db`) => {
    return new Promise((resolve, reject) => {
      db = new sqlite3.Database(path, err => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  },

  /**
   * Close database connection.
   */
  close: () => {
    return new Promise((resolve, reject) => {
      db.close(err => {
        if (err) {
          reject(err);
        }
      });
      resolve(true);
    });
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
