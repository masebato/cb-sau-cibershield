'use strict';

const assetsService = require('../services/assets.service');

module.exports.create = async (req, res) => {
  const { type, value } = req.body;
  const result = await assetsService.createAsset({ userId: req.user.id, type, value });
  res.json(result);
};

module.exports.remove = async (req, res) => {
  const { id } = req.params;
  await assetsService.deleteAsset({ userId: req.user.id, assetId: Number(id) });
  res.json({ message: 'Activo eliminado correctamente' });
};
