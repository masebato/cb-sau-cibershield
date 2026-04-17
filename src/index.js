'use strict';

const server = require('@masebato/apix');

server.openapi     = './src/openapi/openapi.yml';
server.controllers = './src/controllers/index.js';

server.securityHandlers = {
  m2mAuth: async (req, scopes, schema) => {
    const { verifyM2MToken } = require('./providers/m2m');
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new Error('M2M token requerido');
    verifyM2MToken(token);
    // El gateway pasa el contexto del usuario como headers
    req.caller = {
      userId:    req.headers['x-user-id']    ? Number(req.headers['x-user-id'])    : null,
      companyId: req.headers['x-company-id'] ? Number(req.headers['x-company-id']) : null,
      role:      req.headers['x-user-role']  ?? null,
    };
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
