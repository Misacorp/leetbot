import moment from 'moment-timezone';

let lastReaction;

const handleJarka = msg => {
  if (['Kirka#4203'].includes(msg.author.tag)) {
    if (!lastReaction || lastReaction < new Date()) {
      msg.react('😠');

      lastReaction = moment(new Date())
        .add(10, 'm')
        .toDate();
    }
  }
};
export default handleJarka;
