import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger';
import dotenv from 'dotenv';

import routes from './leetAPI/routes';

// Load env variables to process.env
dotenv.config();

const app = express();
app.disable('x-powered-by');
app.enable('strict-routing');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// TODO: Install express-winston

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Remove trailing slashes
app.use((req, res, next) => {
  if (req.url.substr(-1) === '/' && req.url.length > 1) req.url.slice(0, -1);
  next();
});

// API routes
app.use('/api', routes);

// Client
if (process.env.CLIENT_PATH) {
  app.use('/', express.static(process.env.CLIENT_PATH));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: process.env.CLIENT_PATH });
  });
} else {
  logger.info(
    'Client app path not defined in .env file. The client app will not be served but everything else should work.',
  );
}

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    message: err.message,
  });
});

export default app;
