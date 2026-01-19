const express = require('express');
require('express-async-errors');
const helmet = require('helmet');

const authRouter = require('./routes/auth');
const { notFoundHandler, errorHandler } = require('./middleware/errors');

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/auth', authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;






