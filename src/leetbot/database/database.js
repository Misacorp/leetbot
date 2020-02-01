const DB = require('better-sqlite3-helper');
const appRoot = require('app-root-path');

const isDevelopment = process.env.ENV === 'development';
const forceMigrate = isDevelopment && true;

const database = {
  /**
   * Open a database connection in a file.
   * @param {string} path Path to database file directory.
   */
  open: (path = `${appRoot}/database`) => {
    // The first call creates the global instance with your settings
    DB({
      path: `${path}/leet.db`, // this is the default
      memory: false, // create a db only in memory
      readonly: false, // read only
      fileMustExist: false, // throw error if database not exists
      WAL: true, // automatically enable 'PRAGMA journal_mode = WAL'
      migrate: {
        // disable completely by setting `migrate: false`
        force: forceMigrate ? 'last' : false, // set to 'last' to automatically reapply the last migration-file
        table: 'migration', // name of the database table that is used to keep track
        migrationsPath: `${__dirname}/migrations`, // path of the migration-files
      },
    });

    console.log(`Opened database at ${path}/leet.db`);
  },

  /**
   * Close database connection.
   */
  close: () => {
    DB().close();
  },

  /**
   * Database instance
   */
  getDB: () => DB,
};

export default database;
