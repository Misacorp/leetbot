/**
 * Used for testing and debugging messages.
 * @param {object} msg Discord message object.
 */
const debugHandler = msg => {
  if (msg.content === '!dump') {
    // database.getDB().all('SELECT DISTINCT * FROM messages', [], (err, rows) => {
    //   if (err) {
    //     console.error(err);
    //   }
    //   rows.forEach(r => console.log(r));
    // });
  }
  msg.react('✅');
};

export default debugHandler;
