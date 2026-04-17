'use strict';

const jwt    = require('jsonwebtoken');
const config = require('../config');

module.exports.signAccessToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

module.exports.signRefreshToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtRefreshExpiresIn });
};

module.exports.verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};
