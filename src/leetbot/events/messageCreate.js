import handleEmoji from '../handleEmoji';
import leetHandler from '../messageHandlers/leetHandler';
import leebHandler from '../messageHandlers/leebHandler';
import handlePhrases from '../messageHandlers/phrases/handlePhrases';
import handleCommands from '../messageHandlers/commands/handleCommands';
import debugHandler from '../messageHandlers/debugHandler';

/**
 * Handles message creation events
 * @param client Bot client
 * @param msg    Message object
 */
const onMessageCreate = (client, msg) => {
  if (msg.author.bot) {
    return;
  }

  const leetHandled = handleEmoji(msg, 'leet', (message) => leetHandler(message));

  if (!leetHandled) {
    const leebHandled = handleEmoji(msg, 'leeb', (message) => leebHandler(message));

    if (!leebHandled) {
      handlePhrases(msg);
      handleCommands(msg, client);
    }
  }

  debugHandler(msg);
};

export default onMessageCreate;
