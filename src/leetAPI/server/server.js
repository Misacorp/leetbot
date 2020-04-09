import logger from '../../logger';
import getServer from '../../leetbot/database/queries/getServer';
import getMessagesByServer from '../../leetbot/database/queries/getMessagesByServer';
import countByType from '../../analysis/countByType';
import countByUserByType from '../../analysis/countByUserByType';

import { USER } from '../routeFragments';
import getPublicUrl from '../util/getPublicUrl';

/**
 * Gets a single server's summary.
 */
const server = (req, res) => {
  const publicUrl = getPublicUrl(req);

  // Parse request
  const { serverId } = req.params;

  // Get server from DB
  try {
    const serverInfo = getServer(serverId);

    // Server not found?
    if (!serverInfo) {
      res.status(404);
      res.send();
      return;
    }

    const returnValue = { ...serverInfo };

    const messages = getMessagesByServer(serverId);

    // How many messages are there of a given type?
    const countsByType = countByType(messages);
    returnValue.counts = countsByType;

    const countsByUserByType = countByUserByType(messages);
    returnValue.users = countsByUserByType;

    // Add links to individual user data
    returnValue.users = returnValue.users.map(user => {
      return { ...user, _links: { self: `${publicUrl}/${USER}/${user.id}` } };
    });

    // Construct response
    const body = returnValue;
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

export default server;
