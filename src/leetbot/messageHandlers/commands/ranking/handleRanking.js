import ranking from './ranking';

/**
 * Handles a ranking command.
 * @param {object} msg  Discord.js message
 * @param {Array}  args Command arguments.
 * @returns {String{boolena}} String representation of the requested ranking.
 */
const handleRanking = (msg, args) => {
  let content = 'Ranking komennon käyttö: @leetbot ranking <viestin tyyppi>';

  const uppercaseArgs = args.map(arg => arg.toUpperCase());

  if (uppercaseArgs.includes('LEET')) {
    const ranks = ranking(msg, 'LEET');
    console.log(ranks);

    const leetRanks = ranks.map((row, index) => `${index + 1}. ${row.name} - ${row.counts.LEET} leets`);
    content = `LEET ranking for ${msg.guild.name}`;
    content = `${content}\n${leetRanks.join('\n')}`;
  }

  msg.channel.send(content);
};

export default handleRanking;
