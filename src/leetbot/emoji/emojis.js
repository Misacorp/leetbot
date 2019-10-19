const wantedEmojiNames = ['leet', 'leeb'];
const emojis = {};

/**
 * Gets and stores a list of relevant emojis.
 * @param {object} client Discord client.
 * @returns {object} Key-value pairs where the key is an emoji's name
 *                   and the value is the corresponding emoji object.
 */
const getEmojis = client => {
  if (Object.keys(emojis).length < 1) {
    client.emojis.forEach(function getEmojiByName(emoji) {
      if (wantedEmojiNames.includes(emoji.name)) {
        emojis[emoji.name] = emoji;
      }
    });
  }
  return emojis;
};

export default emojis;
export { getEmojis };
