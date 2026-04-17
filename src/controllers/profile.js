'use strict';

const profileService = require('../services/profile.service');

module.exports.get = async (req, res) => {
  const result = await profileService.getProfile({ userId: req.user.id });
  res.json(result);
};

module.exports.update = async (req, res) => {
  const { company_name, sector } = req.body;
  const result = await profileService.updateProfile({ userId: req.user.id, company_name, sector });
  res.json(result);
};
