'use strict';

const server               = require('@masebato/apix');
const { createM2MHandler } = require('@masebato/apix');
const config               = require('./config');

server.openapi     = './src/openapi/openapi.yml';
server.controllers = './src/controllers/index.js';

const _m2mBase = createM2MHandler({ secret: config.m2mSecret, issuer: 'cibershield-gateway' });

server.securityHandlers = {
  m2mAuth: async (req, scopes, schema) => {
    await _m2mBase(req, scopes, schema); // valida y setea req.m2m
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

server.onError = async (err) => {
  // Transforma errores de DB u otros errores de dominio sin status
  // AppError ya trae .status, apix lo lee automáticamente
  // Solo necesitamos mapear errores inesperados de terceros aquí
  return err;
};

server.start().catch((err) => {
  console.error('Failed to start CB-SAU:', err);
  process.exit(1);
});
