'use strict';

const jwt    = require('jsonwebtoken');
const config = require('../config');

module.exports.verifyM2MToken = (token) => {
  const payload = jwt.verify(token, config.m2mSecret);
  if (payload.iss !== 'cibershield-gateway') {
    throw new Error('Emisor M2M inválido');
  }
  return payload;
};

module.exports.signM2MToken = () => {
  return jwt.sign(
    { iss: 'cibershield-gateway', sub: 'service-call' },
    config.m2mSecret,
    { expiresIn: '1m' },
  );
};
