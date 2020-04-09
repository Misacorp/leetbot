import logger from '../../logger';
import getServers from '../../leetbot/database/queries/getServers';
import { SERVER } from '../routeFragments';
import getPublicUrl from '../util/getPublicUrl';

/**
 * Gets basic information about all servers
 */
const server = (req, res) => {
  const publicUrl = getPublicUrl(req);

  // Get user from DB
  try {
    const servers = getServers();
    const serversWithLinks = servers.map(s => ({ ...s, _links: { self: `${publicUrl}/${SERVER}/${s.id}` } }));

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(serversWithLinks));
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(e));
  }
};

export default server;
