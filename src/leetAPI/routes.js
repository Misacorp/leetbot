import { Router } from 'express';

import * as routeFragments from './routeFragments';
import user from './user';
import servers from './server/servers';
import server from './server/server';

const routes = Router({ strict: true });

routes.get(`/${routeFragments.USER}/:userId`, (req, res) => {
  user(req, res);
});

routes.get(`/${routeFragments.SERVER}`, (req, res) => {
  servers(req, res);
});

routes.get(`/${routeFragments.SERVER}/:serverId`, (req, res) => {
  server(req, res);
});

export default routes;
