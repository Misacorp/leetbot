import logger from '../logger';
import getMessagesByUserId from '../leetbot/database/queries/getMessagesByUserId';

const user = (req, res) => {
  // Parse request
  const { userId } = req.params;

  // Get user from DB
  try {
    const userData = getMessagesByUserId(userId);

    // Construct response
    const body = userData;
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(body));
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(e));
  }
};

export default user;
