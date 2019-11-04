import getMessagesByUserName from '../leetbot/database/queries/getMessage';

const user = (req, res) => {
  // Parse request
  const { userName } = req.params;
  const [, name, number] = userName.match(/(.+)([0-9]{4}$)/);
  const tag = `${name}#${number}`;

  // Get user from DB
  try {
    const userData = getMessagesByUserName(tag);
    console.log(userData);

    // Construct response
    const body = userData;
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(body));
  } catch (e) {
    console.error(e);
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(e));
  }
};

export default user;
