'use strict';

// const db = require('../providers/db');

module.exports.createAsset = async ({ userId, type, value }) => {
  // TODO: validar que el activo no esté duplicado para la empresa
  // TODO: insertar activo en DB y retornar registro creado
  throw new Error('Not implemented');
};

module.exports.deleteAsset = async ({ userId, assetId }) => {
  // TODO: verificar que el activo pertenece a la empresa del usuario
  // TODO: eliminar activo de DB
  throw new Error('Not implemented');
};
