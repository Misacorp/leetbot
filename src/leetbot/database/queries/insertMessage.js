import database from '../database';

/**
 * Inserts a message into the messages table.
 */
const insertMessage = () => {
  const db = database.getDB();
  console.log(db);
};

export default insertMessage;
