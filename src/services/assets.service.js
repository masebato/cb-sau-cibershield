'use strict';

const db = require('../providers/db');
const { NotFoundError, ConflictError, ForbiddenError } = require('@masebato/apix').errors;

module.exports.createAsset = async ({ userId, type, value }) => {
  const user = await db.getUserById(userId);
  if (!user) throw new NotFoundError('Usuario no encontrado');

  const existing = await db.getAssetByValue({ company_id: user.company_id, type, value });
  if (existing) throw new ConflictError('El activo ya está registrado');

  return db.createAsset({ company_id: user.company_id, type, value });
};

module.exports.deleteAsset = async ({ userId, assetId }) => {
  const user  = await db.getUserById(userId);
  if (!user) throw new NotFoundError('Usuario no encontrado');

  const asset = await db.getAssetById(assetId);
  if (!asset) throw new NotFoundError('Activo no encontrado');
  if (asset.company_id !== user.company_id) throw new ForbiddenError('El activo no pertenece a tu empresa');

  await db.deleteAsset(assetId);
};
