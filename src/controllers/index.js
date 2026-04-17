'use strict';

const authController    = require('./auth');
const profileController = require('./profile');
const assetsController  = require('./assets');

// ── Health ────────────────────────────────────────────────────────────────────

module.exports['sau.health'] = async (req, res) => {
  res.json({ service: 'sau', status: 'ok' });
};

// ── Auth ──────────────────────────────────────────────────────────────────────

module.exports['auth.register']      = authController.register;
module.exports['auth.login']         = authController.login;
module.exports['auth.logout']        = authController.logout;
module.exports['auth.passwordReset'] = authController.passwordReset;

// ── Profile ───────────────────────────────────────────────────────────────────

module.exports['auth.profile.get']    = profileController.get;
module.exports['auth.profile.update'] = profileController.update;

// ── Assets ────────────────────────────────────────────────────────────────────

module.exports['auth.assets.create'] = assetsController.create;
module.exports['auth.assets.delete'] = assetsController.remove;
