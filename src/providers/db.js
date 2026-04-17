'use strict';

const config = require('../config');

// Placeholder para la conexión a base de datos.
// Reemplazar con el cliente real (pg, knex, prisma, etc.)

let _client = null;

module.exports.getClient = () => {
  if (!_client) throw new Error('DB not connected. Call db.connect() first.');
  return _client;
};

module.exports.connect = async () => {
  // TODO: inicializar conexión con config.db
  // _client = new Pool(config.db);
  console.log('DB connected (placeholder)');
};

module.exports.disconnect = async () => {
  // TODO: cerrar pool de conexiones
  _client = null;
};
