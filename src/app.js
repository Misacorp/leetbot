import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './leetAPI/routes';

const app = express();
app.disable('x-powered-by');
app.enable('strict-routing');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test',
  }),
);
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
app.use('/', express.static(process.env.CLIENT_PATH));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: process.env.CLIENT_PATH });
});

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
