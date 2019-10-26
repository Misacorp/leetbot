const DB = require('better-sqlite3-helper');

const database = {
  /**
   * Open a database connection in a file.
   * @param {string} path Path to database file directory.
   */
  open: (path = `${__dirname}`) => {
    // The first call creates the global instance with your settings
    DB({
      path: `${path}/leet.db`, // this is the default
      memory: false, // create a db only in memory
      readonly: false, // read only
      fileMustExist: false, // throw error if database not exists
      WAL: true, // automatically enable 'PRAGMA journal_mode = WAL'
      migrate: {
        // disable completely by setting `migrate: false`
        force: process.env.ENV === 'development' ? 'last' : false, // set to 'last' to automatically reapply the last migration-file
        table: 'migration', // name of the database table that is used to keep track
        migrationsPath: `${path}/migrations`, // path of the migration-files
      },
    });

    console.log(`Opened database at ${path}/leet.db`);
  },

  /**
   * Close database connection.
   */
  close: () => {
    console.log('No close method defined');
  },

  /**
   * Database instance
   */
  getDB: () => DB,
};

export default database;
