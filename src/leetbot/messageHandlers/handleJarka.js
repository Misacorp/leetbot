import moment from 'moment-timezone';

let lastReaction;

const displeased = false;

const handleJarka = msg => {
  if (['Kirka#4203'].includes(msg.author.tag)) {
    if (msg.content.trim().toLowerCase() === 'winner winner chicken dinner') {
      msg.react('🐔');
    }

    // Show a displeased face
    if (displeased && (!lastReaction || lastReaction < new Date())) {
      msg.react('😠');

      lastReaction = moment(new Date())
        .add(20, 'm')
        .toDate();
    }
  }
};
export default handleJarka;
