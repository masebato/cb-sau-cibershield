'use strict';

// const db  = require('../providers/db');
// const jwt = require('../providers/jwt');
// const bcrypt = require('bcryptjs');

module.exports.register = async ({ email, password, company_name, sector }) => {
  // TODO: verificar email único
  // TODO: hashear password con bcrypt
  // TODO: crear empresa y usuario en DB
  // TODO: generar access_token y refresh_token
  throw new Error('Not implemented');
};

module.exports.login = async ({ email, password }) => {
  // TODO: buscar usuario por email
  // TODO: comparar password con bcrypt
  // TODO: generar access_token y refresh_token
  throw new Error('Not implemented');
};

module.exports.logout = async ({ refresh_token }) => {
  // TODO: invalidar refresh_token en DB (blacklist o borrar)
  throw new Error('Not implemented');
};

module.exports.requestPasswordReset = async ({ email }) => {
  // TODO: buscar usuario, generar token temporal, enviar email
  throw new Error('Not implemented');
};
