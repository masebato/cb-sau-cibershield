'use strict';

const server = require('@masebato/apix');

server.openapi     = './src/openapi/openapi.yml';
server.controllers = './src/controllers/index.js';

server.securityHandlers = {
  bearerAuth: async (req, scopes, schema) => {
    const { verifyAccessToken } = require('./providers/jwt');
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new Error('Token requerido');
    req.user = verifyAccessToken(token);
    return true;
  },
};

server.onStart = async (app, openapi, config) => {
  console.log(`CB-SAU started [${config.nodeEnv}] on port ${config.port}`);
};

server.onShutdown = async () => {
  console.log('CB-SAU shutting down');
};

server.onError = async (err, req, res) => {
  return err;
};

server.start().catch((err) => {
  console.error('Failed to start CB-SAU:', err);
  process.exit(1);
});
